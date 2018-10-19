package com.sr.platform.server.memberManagement.service;

import com.sr.platform.server.memberManagement.bean.WxChangeintegration;

import java.util.List;
import java.util.Map;

public interface IMemberManagementService {
    List getMemberUsageRecords(
            String path,
            String startDate,
            String endDate
      );

    List<WxChangeintegration> getFreeDay(
            String startDate,
            String endDate
    );
    Map<String,Object> getWxMembers(
             String startDate,
             String endDate,
             int pageSize,
             int start,
             String search
    );



}
