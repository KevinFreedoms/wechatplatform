package com.sr.platform.server.product.service;
import com.sr.platform.server.product.bean.EpRetailProduct;
import com.sr.platform.server.product.bean.EpRetailProductSort;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * Created by xxx on 2018/4/24.
 */
public interface IProductService {
    /**
     * 根据类别查询单品
     * @param sortId
     * @return
     */
    List<EpRetailProduct> findProduct(String sortId) throws IOException;

    /**
     * 根据类别查询单品
     * @param sortId
     * @return
     */
    List<EpRetailProduct> findProductRef(String sortId);
    /**
     * 获取产品类别
     * @return
     */
    List<EpRetailProductSort> findSort();

    /**
     * 根据产品编码查询图片
     * @param productId
     * @return
     */
    Map<String, Object> findImages(String productId);

    /**
     * 上传图片
     * @param mFile
     * @param productId
     * @param locId
     * @param imageType
     * @return
     */
    Map<String, Object> uploadObject(MultipartFile mFile, String productId,String locId,Integer imageType);

    /**
     *
     * @param productId
     * @param imageId
     * @param imageUrl
     * @return
     */
    Map<String, Object> deleteImage(String productId, String imageId, String imageUrl);
}
