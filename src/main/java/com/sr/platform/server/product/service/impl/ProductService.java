package com.sr.platform.server.product.service.impl;

import com.sr.platform.common.utils.StringUtil;
import com.sr.platform.server.company.bean.WxCompanyStaff;
import com.sr.platform.server.company.util.ImagesUtil;
import com.sr.platform.server.product.bean.EpRetailProduct;
import com.sr.platform.server.product.bean.EpRetailProductSort;
import com.sr.platform.server.product.bean.WxImageManger;
import com.sr.platform.server.product.dao.ProductDao;
import com.sr.platform.server.product.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;
import org.springframework.transaction.support.TransactionCallback;
import org.springframework.transaction.support.TransactionTemplate;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.util.*;

/**
 * Created by xxx on 2018/4/24.
 */
@Service
public class ProductService implements IProductService {
    @Autowired
    private PlatformTransactionManager transactionManager;
    @Autowired
    private ProductDao productDao;
    @Autowired
    HttpServletRequest request;

    @Override
    public List<EpRetailProduct> findProduct(String sortId) {
        List<EpRetailProduct> list  = new ArrayList<>();
        try {
            if("0".equals(sortId)){
                list =  productDao.getProductAll();
            }else{
                list =  productDao.getProductById(sortId);
            }
            //获得项目所在路径
            String mk = request.getServletContext().getRealPath(File.separator);
            for (int i=0;i<list.size();i++){
                String productId = list.get(i).getProductId();
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
    public List<EpRetailProduct> findProductRef(String sortId) {
        List<EpRetailProduct> list  = new ArrayList<>();
        try {
            if(StringUtils.isEmpty(sortId)){
                list =  productDao.getProductAll();
            }else{
                list =  productDao.getProductById(sortId);
            }
            //获得项目所在路径
            String mk = request.getServletContext().getRealPath(File.separator);
            for (int i=0;i<list.size();i++){
                String productId = list.get(i).getProductId();
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
    public List<EpRetailProductSort> findSort() {
        return productDao.getSortAll();
    }

    @Override
    public Map<String, Object> findImages(String productId) {
        Map<String, Object> reMap = new HashMap<>();
        //获得项目所在路径
        String mk = request.getServletContext().getRealPath(File.separator);
        try {
            if (productId == null || "".equals(productId)) {
                reMap.put("status", 0);
                reMap.put("Msg", "参数错误");
                return reMap;
            }
            //循环并将没有的文件恢复到项目下
            List<WxImageManger> imageList = productDao.findImages(productId);
            int size = imageList.size();
            if(size==0){
                reMap.put("status", 1);
                reMap.put("list", imageList);
                reMap.put("listSize",0);
                return reMap;
            }
            for (WxImageManger image : imageList) {
                String filePath = mk + image.getImageUrl();
                File dir = new File(filePath); // filePath表示文件路径
                if (!dir.exists()) {
                    byte[] imgblob = image.getImageBlob();
                    InputStream in = new ByteArrayInputStream(imgblob); // imgblob 表示图片blob 将其转化成数据流
                    ImagesUtil.streamToImage(in, filePath);
                }
            }
            reMap.put("status", 1);
            reMap.put("list", imageList);
            reMap.put("listSize", size);
            return reMap;
        } catch (Exception e) {
            reMap.put("status", 0);
            reMap.put("Msg", "系统繁忙,稍后重试");
            e.printStackTrace();
            return reMap;
        }
    }

    @Override
    public Map<String, Object> uploadObject(final MultipartFile mFile,final String productId,final String locId,final Integer imageType) {
        TransactionTemplate template = new TransactionTemplate(transactionManager);
        final Map<String, Object> reMap =new HashMap<>();
        template.execute(new TransactionCallback<Boolean>() {
            @Override
            public Boolean doInTransaction(TransactionStatus transactionStatus) {
                try{
                    String mk = request.getServletContext().getRealPath(File.separator) + "upLoadImages";
                    String imageName=productId+System.currentTimeMillis()+(mFile.getOriginalFilename().substring(
                            mFile.getOriginalFilename().lastIndexOf(".")));
                    if(0==imageType){
                        List<WxImageManger> list=productDao.findImages(productId);
                        if(list!=null&&list.size()>0){
                            reMap.put("status", 0);
                            reMap.put("Msg", "图片已上传");
                            return false;
                        }
                    }
                    if (productId == null || StringUtils.isEmpty(productId)) {
                        reMap.put("status", 0);
                        reMap.put("Msg", "请正确获取productId");
                        return false;
                    }
                    if (mFile == null) {
                        reMap.put("status", 0);
                        reMap.put("Msg", "请选择文件");
                        return false;
                    }
                    if (mFile.isEmpty()) {
                        reMap.put("status", 0);
                        reMap.put("Msg", "文件内容不能为空");
                        return false;
                    }
                    //判断项目下文件夹是否存在
                    File upLoadImages = new File(mk);
                    if (!upLoadImages.exists()) {
                        upLoadImages.mkdir();
                    }
                    //保存文件到项目目录下
                    String path=mk + File.separator + imageName;
                    mFile.transferTo(new File(path));
                    File file =new File(path);
                    InputStream in = new FileInputStream(file);
                    //获得图片输入流并将图片转换为Blob类型
                    //InputStream in = mFile.getInputStream();
                    byte[] buff = new byte[100]; //buff用于存放循环读取的临时数据
                    int rc = 0;
                    ByteArrayOutputStream swapStream = new ByteArrayOutputStream();
                    while ((rc = in.read(buff, 0, 100)) > 0) {
                        swapStream.write(buff, 0, rc);
                    }
                    in.close();
                    byte[] in_b = swapStream.toByteArray(); //in_b即为所得

                    //存储图片信息
                    String imageurl = File.separator + "upLoadImages" + File.separator + imageName;
                    WxImageManger image = new WxImageManger();
                    image.setImageName(imageName);
                    image.setImageBlob(in_b);
                    image.setCreateUser(locId);
                    image.setCreateDate(new Date());
                    image.setLastUpdateUser(locId);
                    image.setLastUpdateDate(new Date());
                    image.setImageType(imageType);
                    image.setImageToId(productId);
                    image.setImageId(String.valueOf(System.currentTimeMillis()));
                    image.setImageUrl(imageurl);
                    image.setShowIndex(0);
                    //插入图片
                    productDao.insertImage(image);
                    //更新单品信息
                    productDao.updateRetailProductUrl(productId,imageurl);
                    reMap.put("path", imageurl);
                    reMap.put("imageId",image.getImageId());
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

    public Map<String, Object> deleteImage(final String productId,final String imageId,final String imageUrl) {
        TransactionTemplate template = new TransactionTemplate(transactionManager);
        final Map<String, Object> reMap = new HashMap<>();
        template.execute(new TransactionCallback<Boolean>() {
            @Override
            public Boolean doInTransaction(TransactionStatus transactionStatus) {
                try {
                    if (productId == null || StringUtils.isEmpty(productId)) {
                        reMap.put("status", 0);
                        reMap.put("Msg", "请正确获取productId");
                        return false;
                    }
                    if (imageId == null || StringUtils.isEmpty(imageId)) {
                        reMap.put("status", 0);
                        reMap.put("Msg", "请正确获取imageId");
                        return false;
                    }
                    if(imageUrl==null||StringUtils.isEmpty(imageUrl)){
                        reMap.put("status", 0);
                        reMap.put("Msg", "请正确获取imageUrl");
                        return false;
                    }
                    String mk = request.getServletContext().getRealPath(File.separator);
                    Boolean success=new File(mk + imageUrl.substring(3)).delete();
                    //更新图片
                    productDao.deleteImageById(productId,imageId);
                    //更新单品信息
                    String imageurl="image/menu/default.jpg";
                    productDao.updateRetailProductUrl(productId,imageurl);
                    reMap.put("status", 1);
                    return true;
                } catch (Exception e) {
                    reMap.put("status", 0);
                    reMap.put("Msg", "系统繁忙,稍后重试");
                    transactionStatus.setRollbackOnly();
                    return false;
                }
            }
        });
        return reMap;
    }
}
