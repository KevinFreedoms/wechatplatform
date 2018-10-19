package com.sr.platform.server.integration.service.impl;

import com.sr.platform.common.utils.StringUtil;
import com.sr.platform.server.company.util.ImagesUtil;
import com.sr.platform.server.customer.bean.EpLoc;
import com.sr.platform.server.customer.dao.IWxStaffDao;
import com.sr.platform.server.integration.bean.WxCommodity;
import com.sr.platform.server.integration.bean.WxCommodityCategory;
import com.sr.platform.server.integration.dao.IWxCommodityCategoryDao;
import com.sr.platform.server.integration.dao.IWxCommodityDao;
import com.sr.platform.server.integration.service.IIntergrationService;
import com.sr.platform.server.product.bean.WxImageManger;
import com.sr.platform.server.product.dao.ProductDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionCallback;
import org.springframework.transaction.support.TransactionTemplate;

import javax.servlet.http.HttpServletRequest;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.InputStream;
import java.util.*;

/**
 * Created by xxx on 2018/4/26.
 */
@Service
public class IntergeationService implements IIntergrationService{
    @Autowired
    private PlatformTransactionManager transactionManager;
    @Autowired
    HttpServletRequest request;
    @Autowired
    private IWxCommodityDao wxCommodityDao;
    @Autowired
    private ProductDao productDao;
    @Autowired
    private IWxStaffDao wxStaffDao;
    @Autowired
    private IWxCommodityCategoryDao wxCommodityCategoryDao;
    @Override
    public List<WxCommodityCategory> queryGiftCategory() {
        return wxCommodityCategoryDao.queryGiftCategory();
    }

    @Override
    public List<WxCommodity> queryCommodity(String categoryId) {
        List<WxCommodity> list = new ArrayList<WxCommodity>();
        try {
            if("0".equals(categoryId)){
                list = wxCommodityDao.queryGiftAll();
            }else{
                list = wxCommodityDao.queryGiftById(categoryId);
            }
            String productId = "";
            //获得项目所在路径
            String mk = request.getServletContext().getRealPath(File.separator);
            for (int i=0;i<list.size();i++){
                productId = list.get(i).getCommodityId();
                //循环并将没有的文件恢复到项目下
                List<WxImageManger> imageList = productDao.findImages(productId);
                for (WxImageManger image : imageList) {
                    String filePath = mk + image.getImageUrl();
                    File dir = new File(filePath); // filePath表示文件路径
                    if (!dir.exists()) {
                        byte[] imgblob = image.getImageBlob();
                        InputStream in = new ByteArrayInputStream(imgblob); // imgblob 表示图片blob 将其转化成数据流
                        ImagesUtil.streamToImage(in, filePath);
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return list;
    }

    @Override
    public Map<String, Object> createCommodityId(final String id,final String cateid) {
        TransactionTemplate template = new TransactionTemplate(transactionManager);
        final Map<String, Object> reMap =new HashMap<>();
        template.execute(new TransactionCallback<Boolean>() {
            @Override
            public Boolean doInTransaction(TransactionStatus transactionStatus) {
                try{
                    //生成礼品编码
                    List<WxCommodity> commodities = wxCommodityDao.getMaxNum(cateid);
                    Integer temp  = commodities.size()>0?Integer.parseInt(commodities.get(0).getCommodityId())+1:1;
                    String commodityId = "JF"+cateid+ String.format("%04d",temp);
                    String mk = request.getServletContext().getRealPath(File.separator);
                    List<WxImageManger> imageList = productDao.findImages(commodityId);
                    String imageUrl="";
                    if(imageList.size()>0){
                        for(int i=0;i<imageList.size();i++){
                            imageUrl= (String) imageList.get(i).getImageUrl();
                            Boolean success =new File(mk + imageUrl.substring(3)).delete();
                        }
                        productDao.deleteImage(commodityId);
                    }
                    if(StringUtil.isNotEmpty(id)){
                        imageList = productDao.findImages(id);
                        if(imageList.size()>0){
                            for(int i=0;i<imageList.size();i++){
                                imageUrl= (String) imageList.get(i).getImageUrl();
                                new File(mk + imageUrl.substring(3)).delete();
                            }
                            productDao.deleteImage(id);
                        }
                    }
                    reMap.put("commodityId",commodityId);
                    reMap.put("status", 1);
                    return true;
                }catch (Exception e) {
                    reMap.put("status", 0);
                    reMap.put("Msg", "系统繁忙,稍后重试");
                    transactionStatus.setRollbackOnly();
                    return false;
                }
            }
        });
        return  reMap;
    }

    @Override
    public WxCommodity getCommondity(String id) {
        List<WxCommodity> list = wxCommodityDao.queryCommodityById(id);
        WxCommodity commodity = new WxCommodity();
        if(list.size()>0){
            commodity = list.get(0);
        }
        return commodity;
    }

    @Override
    public Map<String, Object> modifyCommodity(final WxCommodity commodity) {
        TransactionTemplate template = new TransactionTemplate(transactionManager);
        final Map<String, Object> reMap =new HashMap<>();
        template.execute(new TransactionCallback<Boolean>() {
            @Override
            public Boolean doInTransaction(TransactionStatus transactionStatus) {
                try{
                    String id = commodity.getCommodityId();
                    List<WxCommodity> list = wxCommodityDao.queryCommodityById(id);
                    if(list.size()>0){
                        wxCommodityDao.updateCommodity(commodity);
                    }else{
                        wxCommodityDao.insertCommodity(commodity);
                    }
                    reMap.put("status", 1);
                    return true;
                }catch (Exception e) {
                    reMap.put("status", 0);
                    reMap.put("Msg", "系统繁忙,稍后重试");
                    transactionStatus.setRollbackOnly();
                    return false;
                }
            }
        });
        return  reMap;
    }

    @Override
    public List<EpLoc> queryLoc() {
        return wxStaffDao.getEploc();
    }

    @Override
    public Map<String, Object> createCategoryId() {
        Map<String,Object> reMap = new HashMap<String, Object>();
        try{
            //获取最大公司编码
            List<WxCommodityCategory> categoryList = wxCommodityCategoryDao.getCategoryMaxNum();
            Integer temp  = categoryList.size()>0?Integer.parseInt(categoryList.get(0).getCategoryId())+1:1;
            String categoryId =  String.format("%04d",temp);
            WxCommodityCategory category = new WxCommodityCategory();
            category.setCategoryId(categoryId);
            reMap.put("category", category);
            reMap.put("status", 1);
            return reMap;
        }catch (Exception e) {
            reMap.put("status", 0);
            reMap.put("Msg", e.toString());
            e.printStackTrace();
            return reMap;
        }
    }
    @Override
    public Map<String, Object> modifyCategory(final WxCommodityCategory category) {
        TransactionTemplate template = new TransactionTemplate(transactionManager);
        final Map<String, Object> reMap =new HashMap<>();
        template.execute(new TransactionCallback<Boolean>() {
            @Override
            public Boolean doInTransaction(TransactionStatus transactionStatus) {
                try{
                    //判断当前类型是否存在
                    String id = category.getCategoryId();
                    List<WxCommodityCategory> categories = wxCommodityCategoryDao.queryCategoryById(id);
                    if(categories.size()>0){
                        wxCommodityCategoryDao.updateCategory(category);
                        //更新类别下对应单品的名称
                        wxCommodityCategoryDao.updateCommondityCategory(category);
                    }else{
                        wxCommodityCategoryDao.insertCategory(category);
                    }
                    //获取全部类别
                    categories = wxCommodityCategoryDao.queryGiftCategory();
                    reMap.put("categories",categories);
                    reMap.put("status", 1);
                    return true;
                }catch (Exception e) {
                    reMap.put("status", 0);
                    reMap.put("Msg", "系统繁忙,稍后重试");
                    transactionStatus.setRollbackOnly();
                    return false;
                }
            }
        });
        return  reMap;
    }

    @Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
    public Map<String, Object> deleteCategory(final String id) {
        final Map<String, Object> reMap =new HashMap<>();
        try{
            List<WxCommodity> list = wxCommodityDao.queryGiftById(id);
            if(list.size()>0){
                reMap.put("status", 0);
                reMap.put("Msg", "该类别下有单品不可删除");
                return reMap;
            }
            wxCommodityCategoryDao.deleteCategory(id);
            //获取全部类别
            List<WxCommodityCategory> categories = wxCommodityCategoryDao.queryGiftCategory();
            reMap.put("categories",categories);
            reMap.put("status", 1);
            return reMap;
        }catch (Exception e) {
            e.printStackTrace();
            reMap.put("status", 0);
            reMap.put("Msg", "系统繁忙,稍后重试");
            return reMap;
        }
    }
}
