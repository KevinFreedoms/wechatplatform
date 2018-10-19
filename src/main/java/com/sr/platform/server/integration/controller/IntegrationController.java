package com.sr.platform.server.integration.controller;

import com.sr.platform.server.customer.bean.EpLoc;
import com.sr.platform.server.integration.bean.WxCommodity;
import com.sr.platform.server.integration.bean.WxCommodityCategory;
import com.sr.platform.server.integration.service.IIntergrationService;
import com.sr.platform.server.product.bean.WxImageManger;
import com.sr.platform.server.product.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by xxx on 2018/4/25.
 */
@RestController
public class IntegrationController {
    @Autowired
    private IIntergrationService intergrationService;
    @Autowired
    private IProductService productService;
    @Autowired
    HttpServletRequest request;
    /**
     * 进入礼品管理
     * @return
     */
    @RequestMapping(value = "/platform/gift/m")
    public ModelAndView toGift(){
        List<WxCommodityCategory> categories = intergrationService.queryGiftCategory();
        request.setAttribute("categories",categories);
        return new ModelAndView("giftProduct");
    }

    /**
     * 获取礼品类别
     * @return
     */
    @RequestMapping(value = "/platform/gift/category" ,method = RequestMethod.GET)
    @ResponseBody
    List<WxCommodityCategory> queryCategory(){
        return intergrationService.queryGiftCategory();
    }

    /**
     *获取商品类别id
     * @return
     */
    @RequestMapping(value = "/platform/gift/addcategory" ,method = RequestMethod.GET)
    @ResponseBody
    Map<String,Object> createCategoryId(){
        return intergrationService.createCategoryId();
    }

    /**
     *更新添加类别
     * @return
     */
    @RequestMapping(value = "/platform/gift/modifycategory" ,method = RequestMethod.POST)
    @ResponseBody
    Map<String,Object> modifyCategory(@RequestBody WxCommodityCategory category){
        return intergrationService.modifyCategory(category);
    }

    /**
     *删除商品类别
     * @param categoryId
     * @return
     */
    @RequestMapping(value = "/platform/gift/deletecategory" ,method = RequestMethod.GET)
    @ResponseBody
    Map<String,Object> deleteCategoryId(@RequestParam String categoryId){
        return intergrationService.deleteCategory(categoryId);
    }

    /**
     * 查询门店
     * @return
     */
    @RequestMapping(value = "/platform/gift/loc" ,method = RequestMethod.GET)
    @ResponseBody
    public List<EpLoc> queryloc(){
        return intergrationService.queryLoc();
    }

    /**
     * 查询礼品
     * @param id
     * @return
     */
    @RequestMapping(value = "/platform/gift/query" ,method = RequestMethod.GET)
    @ResponseBody
    public List<WxCommodity> queryCommodity(@RequestParam String id){
        return intergrationService.queryCommodity(id);
    }


    /**
     * 新增礼品
     * @return
     */
    @RequestMapping(value = "/platform/gift/add")
    public ModelAndView toAddGift(){
        List<WxCommodityCategory> categories = intergrationService.queryGiftCategory();
        request.setAttribute("categories",categories);
        //获取商品编码
        int status = 0;
        String commodityId = "";
        Map<String,Object> reMap = intergrationService.createCommodityId("",categories.get(0).getCategoryId());
        status = (int)reMap.get("status");
        if(1==status){
            commodityId = reMap.get("commodityId").toString();
        }
        request.setAttribute("commodityId",commodityId);
        return new ModelAndView("addgift");
    }

    /**
     * 切换类别生成新的礼品
     * @param id
     * @param cateid
     * @return
     */
    @RequestMapping(value = "/platform/gift/createcommodity",method = RequestMethod.GET)
    @ResponseBody
    public Map<String,Object> toCreateCommndityId(@RequestParam String id,@RequestParam String cateid){
        return intergrationService.createCommodityId(id,cateid);
    }

    /**
     * 编辑礼品
     * @return
     */
    @RequestMapping(value = "/platform/gift/edit")
    public ModelAndView toEditGift(@RequestParam String id){
        WxCommodity commodity = intergrationService.getCommondity(id);
        request.setAttribute("commodity",commodity);
        Map<String,Object> reMap = productService.findImages(id);
        List<WxImageManger> list = new ArrayList<WxImageManger>();
        int status = (int)reMap.get("status");
        if(1==status){
            list = ( List<WxImageManger>) reMap.get("list");
        }
        request.setAttribute("imagelist",list);
        return new ModelAndView("editgift");
    }


    /**
     * 更新礼品
     * @return
     */
    @RequestMapping(value = "/platform/gift/save",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> saveCommndity(@RequestBody WxCommodity commodity){
        return intergrationService.modifyCommodity(commodity);
    }
}
