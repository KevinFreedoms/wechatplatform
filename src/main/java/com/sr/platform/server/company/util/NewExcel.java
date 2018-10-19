package com.sr.platform.server.company.util;

import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.*;

import java.io.File;
import java.io.FileOutputStream;
import java.util.UUID;
import static org.apache.poi.hssf.util.HSSFColor.*;

public class NewExcel {
    /**
     * 导出Excel
     * @param sheetName sheet名称
     * @param title 标题
     * @param values 内容
     * @param wb HSSFWorkbook对象
     * @return
     */
    public static HSSFWorkbook getHSSFWorkbook(String sheetName,String []title,String [][]values, HSSFWorkbook wb){

        // 第一步，创建一个HSSFWorkbook，对应一个Excel文件
        if(wb == null){
            wb = new HSSFWorkbook();
        }

        // 第二步，在workbook中添加一个sheet,对应Excel文件中的sheet
        HSSFSheet sheet = wb.createSheet(sheetName);

        // 第三步，在sheet中添加表头第0行,注意老版本poi对Excel的行数列数有限制
        HSSFRow row = sheet.createRow(0);

        // 第四步，创建单元格，并设置值表头 设置表头居中
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER); // 创建一个居中格式

        //声明列对象
        HSSFCell cell = null;

        //创建标题
        for(int i=0;i<title.length;i++){
            cell = row.createCell(i);
            cell.setCellValue(title[i]);
            cell.setCellStyle(style);
        }

        //创建内容
        for(int i=0;i<values.length;i++){
            row = sheet.createRow(i + 1);
            for(int j=0;j<values[i].length;j++){
                //将内容按顺序赋给对应的列对象
                row.createCell(j).setCellValue(values[i][j]);
            }
        }
        return wb;
    }

     public boolean createExcelFile(String excelPath,String companyName,String companyId) {
         boolean isCreateSuccess = false;
         Workbook workbook = null;
         try {
             // XSSFWork used for .xslx (>= 2007), HSSWorkbook for 03 .xsl
             workbook = new XSSFWorkbook();
         }catch(Exception e) {
             System.out.println("It cause Error on CREATING excel workbook: ");
             e.printStackTrace();
         }
         if(workbook != null) {
             Sheet sheet = workbook.createSheet("testdata");
             sheet.protectSheet(UUID.randomUUID().toString());
             Row row0 = sheet.createRow(0);
             row0.setHeight((short) (15.625*40));
             for(int i = 0; i <4; i++) {
                 Cell cell_1 = row0.createCell(i, Cell.CELL_TYPE_STRING);
                 CellStyle style = getStyleTop(workbook);
                 cell_1.setCellStyle(style);
                 switch (i){
                     case 0:
                         cell_1.setCellValue(companyName+"餐厅批量充统计表");
                         break;
                     case 1:
                         cell_1.setCellValue("");
                         break;
                     case 2:
                         cell_1.setCellValue("");
                         break;
                     case 3:
                         cell_1.setCellValue("");
                         break;
                 }
                 sheet.autoSizeColumn(i);
             }
             Row row1 = sheet.createRow(1);
             row1.setHeight((short) (15.625*20));
             for(int i = 0; i <4; i++) {
                 Cell cell_1 = row1.createCell(i, Cell.CELL_TYPE_STRING);
                 CellStyle style = getStyle(workbook);
                 cell_1.setCellStyle(style);
                 switch (i){
                     case 0:
                         cell_1.setCellValue("单位名称");
                         break;
                     case 1:
                         cell_1.setCellValue(companyName);
                         break;
                     case 2:
                         cell_1.setCellValue("单位编码");
                         break;
                     case 3:
                         cell_1.setCellValue(companyId);
                         break;
                 }
                 sheet.autoSizeColumn(i);
             }
             Row row2 = sheet.createRow(2);
             row2.setHeight((short) (15.625*20));
             for(int i = 0; i <4; i++) {
                     Cell cell_1 = row2.createCell(i, Cell.CELL_TYPE_STRING);
                     CellStyle style = getStyle(workbook);
                     cell_1.setCellStyle(style);
                 switch (i){
                     case 0:
                         cell_1.setCellValue("会员卡号");
                         break;
                     case 1:
                         cell_1.setCellValue("职工姓名");
                         break;
                     case 2:
                         cell_1.setCellValue("电话");
                         break;
                     case 3:
                         cell_1.setCellValue("充值金额");
                         break;
                 }
                     sheet.autoSizeColumn(i);
                 }
             for (int rowNum = 3; rowNum < 200; rowNum++) {
                 Row row = sheet.createRow(rowNum);

                     for(int i = 0; i < 4; i++) {
                        if(i<3) {
                            CellStyle style = getStyleLow(workbook);
                            Cell cell = row.createCell(i, Cell.CELL_TYPE_STRING);
                            DataFormat format = workbook.createDataFormat();
                            style.setDataFormat(format.getFormat("@"));//设置单元格格式为"文本" 针对身份证号,会员卡号等纺织被科学计数法
                            cell.setCellStyle(style);
                            if(rowNum==3){
                                switch (i){
                                    case 0:
                                        cell.setCellValue("111111111111111111");
                                        break;
                                    case 1:
                                        cell.setCellValue("张三");
                                        break;
                                    case 2:
                                        cell.setCellValue("15611111111");
                                        break;
                                }

                            }else{
                                cell.setCellValue("");
                            }

                        }else {
                            CellStyle style = getStyleLow(workbook);
                            Cell cell = row.createCell(i, Cell.CELL_TYPE_NUMERIC);
                            cell.setCellStyle(style);
                            if(rowNum==3){
                                cell.setCellValue(0);
                            }else {
                                cell.setCellValue("");
                            }
                        }
                     sheet.autoSizeColumn(i);
                     }

                 }
             CellRangeAddress cra =new CellRangeAddress(0, 0, 0, 3); // 起始行, 终止行, 起始列, 终止列
             sheet.addMergedRegion(cra);
             try {
                 FileOutputStream outputStream = new FileOutputStream(excelPath);
                 workbook.write(outputStream);
                 outputStream.flush();
                 outputStream.close();
                 isCreateSuccess = true;
             } catch (Exception e) {
                 System.out.println("It cause Error on WRITTING excel workbook: ");
                 e.printStackTrace();
             }
         }
         File sss = new File(excelPath);
         return isCreateSuccess;
     }
    private CellStyle getStyleTop(Workbook workbook){
        CellStyle style = workbook.createCellStyle();
        style.setAlignment(CellStyle.ALIGN_CENTER);//居中
        style.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
        // 设置单元格字体
        Font headerFont = workbook.createFont(); // 字体
        headerFont.setFontHeightInPoints((short)14);
        headerFont.setColor(BLACK.index);
        headerFont.setFontName("宋体");
        headerFont.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD); // 加粗
        style.setFont(headerFont);
        style.setWrapText(true);

        // 设置单元格边框及颜色
        style.setBorderBottom((short)1);
        style.setBorderLeft((short)1);
        style.setBorderRight((short)1);
        style.setBorderTop((short)1);
        style.setWrapText(true);
        style.setLocked(true);//锁定
        style.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());//填充背景颜色
        style.setFillPattern(CellStyle.SOLID_FOREGROUND);//填充背景颜色没他不显示颜色
        return style;
    }
     private CellStyle getStyle(Workbook workbook){
                 CellStyle style = workbook.createCellStyle();
                 style.setAlignment(CellStyle.ALIGN_CENTER);//居中
                 style.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
                 // 设置单元格字体
                 Font headerFont = workbook.createFont(); // 字体
                 headerFont.setFontHeightInPoints((short)12);
                 headerFont.setColor(BLACK.index);
                 headerFont.setFontName("宋体");
                 headerFont.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD); // 加粗
                 style.setFont(headerFont);
                 style.setWrapText(true);
                 // 设置单元格边框及颜色
                 style.setBorderBottom((short)1);
                 style.setBorderLeft((short)1);
                 style.setBorderRight((short)1);
                 style.setBorderTop((short)1);
                 style.setWrapText(true);
                 style.setLocked(true);//锁定
                 style.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());//填充背景颜色
                 style.setFillPattern(CellStyle.SOLID_FOREGROUND);
                 return style;
             }
     private CellStyle getStyleLow(Workbook workbook){
                 CellStyle style = workbook.createCellStyle();
                 style.setAlignment(CellStyle.ALIGN_CENTER);//居中
                 style.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
                 // 设置单元格字体
                 Font headerFont = workbook.createFont(); // 字体
                 headerFont.setFontHeightInPoints((short)12);
                 headerFont.setColor(BLACK.index);
                 headerFont.setFontName("宋体");
//                 headerFont.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD); // 加粗
                 style.setFont(headerFont);
                 style.setWrapText(true);

                 // 设置单元格边框及颜色
                 style.setBorderBottom((short)1);
                 style.setBorderLeft((short)1);
                 style.setBorderRight((short)1);
                 style.setBorderTop((short)1);
                 style.setWrapText(true);
                 style.setLocked(false);//不锁定
//                 style.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());//填充背景颜色
                 return style;
             }


 }