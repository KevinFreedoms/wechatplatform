package com.sr.platform.server.orderManagement.dao;

import com.sr.platform.server.orderManagement.bean.WxLoc;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IWxLocDao {
    List<WxLoc> getLoc();
}
