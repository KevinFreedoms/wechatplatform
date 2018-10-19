package com.sr.platform.server.product.dao;

import com.sr.platform.server.product.bean.EpRetailProduct;
import com.sr.platform.server.product.bean.EpRetailProductSort;
import com.sr.platform.server.product.bean.WxImageManger;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by xxx on 2018/4/24.
 */
public interface ProductDao {
    /**
     * 获取所有商品信息
     * @return
     */
    List<EpRetailProduct> getProductAll();

    /**
     * 获取所有商品信息
     * @return
     */
    List<EpRetailProduct> getProductAllRef();

    /**
     * 根据类别获取商品
     * @param id
     * @return
     */
    List<EpRetailProduct> getProductById(String id);

    /**
     * 根据类别获取商品(用户优化等单品选择)
     * @param id
     * @return
     */
    List<EpRetailProduct> getProductByIdRef(String id);

    /**
     * 获取商品类别
     * @return
     */
    List<EpRetailProductSort> getSortAll();

    /**
     * 获取图片
     * @param productId
     * @return
     */
    List<WxImageManger> findImages(String productId);

    /**
     *插入图片
     * @param image
     */
    void insertImage(WxImageManger image);


    /**
     * 更新图片信息
     * @param productId
     * @param url
     */
    void updateRetailProductUrl(@Param("productId") String productId, @Param("url") String url);

    /**
     *根据单品和图片编码删除单品
     * @param productId
     * @param imageId
     */
    void deleteImageById(@Param("productId") String productId, @Param("imageId") String imageId);

    /**
     *根据单品删除图片
     * @param productId
     */
    void deleteImage(@Param("productId") String productId);

}
