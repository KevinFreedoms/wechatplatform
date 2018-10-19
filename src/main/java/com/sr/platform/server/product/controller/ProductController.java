package com.sr.platform.server.product.controller;
import com.sr.platform.server.product.bean.EpRetailProduct;
import com.sr.platform.server.product.bean.EpRetailProductSort;
import com.sr.platform.server.product.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * Created by xxx on 2018/4/24.
 */
@Controller
public class ProductController {
    @Autowired
    private IProductService productService;
    @Autowired
    HttpServletRequest request;
    /**
     *进入商品
     * @return
     */
    @RequestMapping(value = "/platform/product/m")
    public ModelAndView toProduct(){
        //获取商品类别
        List<EpRetailProductSort> sort = productService.findSort();
        request.setAttribute("sorts",sort);
        return new ModelAndView("product");
    }
    /**
     * 根据类别获取单品
     * @return
     */
    @RequestMapping(value = "/platform/product/all",method = RequestMethod.GET)
    @ResponseBody
    public List<EpRetailProduct> getProductAll(@RequestParam String id) throws IOException {
        return productService.findProduct(id);
    }

    /**
     * 根据类别获取单品(用于优惠券单品筛选)
     * @return
     */
    @RequestMapping(value = "/platform/product/allcheck",method = RequestMethod.GET)
    @ResponseBody
    public List<EpRetailProduct> getProductAllCheck(@RequestParam String id){
        return productService.findProductRef(id);
    }

    /**
     * 根据图片编码查询图片信息
     * @param productId
     * @return
     */
    @RequestMapping(value = "/platform/product/img",method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> findImages(@RequestParam String productId){
        return productService.findImages(productId);
    }

    @RequestMapping(value = "/platform/product/upLoad" ,method = RequestMethod.POST)
    @ResponseBody
    Map<String,Object> upLoadImage(@RequestParam MultipartFile mFile, @RequestParam String productId,@RequestParam String locId,@RequestParam Integer imageType){
        return productService.uploadObject(mFile,productId,locId,imageType);

    }

    @RequestMapping(value = "/platform/product/delete" ,method = RequestMethod.POST)
    @ResponseBody
    Map<String,Object> upLoadImage(@RequestParam String productId,
                                   @RequestParam String imageId,
                                   @RequestParam String imageUrl){
        return productService.deleteImage(productId,imageId,imageUrl);

    }
}
