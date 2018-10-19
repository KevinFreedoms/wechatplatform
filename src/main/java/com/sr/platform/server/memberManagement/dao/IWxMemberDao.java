package com.sr.platform.server.memberManagement.dao;

import com.sr.platform.server.memberManagement.bean.WxMember;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface IWxMemberDao {
    /**
     * 获得所有会员信息
     * @return
     */
    List<WxMember> getWxMembers(
            @Param("startDate") String startDate,
            @Param("endDate") String endDate
                                );
    List<WxMember> getWxMembersFy(
            @Param("startDate") String startDate,
            @Param("endDate") String endDate,
            @Param("pageSize") int pageSize,
            @Param("start") int start,
            @Param("search") String search
                                );
    Integer reCount( @Param("startDate") String startDate,
                     @Param("endDate") String endDate,
                     @Param("search") String search);
}
