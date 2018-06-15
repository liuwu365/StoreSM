package com.yunda.store.agent.controller;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/agent/monitor")
public class PickAndRecivedController {

    @GetMapping()
    String pickAndRecived() {
        return "agent/monitor/pickAndRecived";
    }
}
