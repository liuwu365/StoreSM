package com.yunda.store.common.filter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @Description: 跨站请求伪造过滤器
 * @User: liuwu_eva@163.com
 * @Date: 2018-05-15 14:44
 */
@WebFilter(filterName = "refererFilter", urlPatterns = "/*")
public class RefererFilter extends HttpServlet implements Filter {
    private Logger logger = LoggerFactory.getLogger(RefererFilter.class);
    private static final long serialVersionUID = 1L;
    private FilterConfig filterConfig;

    @Override
    public void init(FilterConfig config) throws ServletException {
        this.filterConfig = config;
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws ServletException, IOException {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;
        //logger.info("请求地址："+request.getRequestURI());
        // 链接来源地址
        String referer = request.getHeader("referer");
        if (referer != null && !referer.contains(request.getServerName())) {
            //如果 链接地址来自其他网站，则返回错误页面
            logger.info("跨站请求伪造地址："+request.getRequestURI());
            request.getRequestDispatcher("/templates/403.html").forward(request, response);
        } else {
            chain.doFilter(request, response);
        }
    }

    @Override
    public void destroy() {
        this.filterConfig = null;
    }




}
