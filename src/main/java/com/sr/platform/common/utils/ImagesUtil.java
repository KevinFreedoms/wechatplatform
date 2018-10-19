package com.sr.platform.common.utils;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

/**
 * Created by xxx on 2018/4/24.
 */
public class ImagesUtil {
    public static boolean streamToImage(InputStream in, String targetPath) throws IOException {
        File file = new File(targetPath);
        String path = targetPath.substring(0, targetPath.lastIndexOf(File.separator));
        if(!file.exists()){
            new File(path).mkdir();//文件夹的创建
        }
        FileOutputStream fos = null;
        try {
            fos = new FileOutputStream(file);
            int len = 0;
            byte[] buf = new byte[1024];
            while ((len = in.read(buf)) != -1) {
                fos.write(buf, 0, len);
            }
            fos.flush();
        } catch (Exception e) {
            e.printStackTrace(System.err);
            return false;
        } finally {
            in.close();
            fos.close();
            return true;
        }
    }
}
