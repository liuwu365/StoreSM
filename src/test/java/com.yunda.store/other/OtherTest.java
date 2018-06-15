package com.yunda.store.other;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.LinkedList;
import java.util.List;

/**
 * @Description: 其它测试
 * @User: liuwu_eva@163.com
 * @Date: 2018-05-11 14:30
 */
public class OtherTest {
    private static Logger logger = LoggerFactory.getLogger(OtherTest.class);

    public static void main(String[] args) {
        method2();
    }

    public static void method1(){
        List<String> hourList = new LinkedList<>();
        List<Integer> valueList = new LinkedList<>();

        String data = "1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0,13:0,14:0,15:120,16:300,17:450,18:0,19:0,20:0,21:0,22:0,23:0,24:0";
        String[] splitStr = data.split(",");
        //for (int i = 0; i < splitStr.length; i++) {
        //    System.out.println(splitStr[i]);
        //
        //    String[] target = splitStr[i].split(":");
        //    hourList.add(target[0]);
        //    valueList.add(Integer.parseInt(target[1]));
        //
        //}
        //logger.info(JSONObject.toJSONString(hourList));
        //logger.info(JSONObject.toJSONString(valueList));

        logger.info(splitStr[11]); //n-1  n小时点
        //String[] aa = splitStr[11].split(":");
        //logger.info(aa[0]);
        //logger.info(aa[1]);

        logger.info(data);
        data = data.replace(splitStr[11],"12:33");
        logger.info(data);


    }

    public static void method2(){
        String startData = "2018-04-24 08:00:00";
        String hour = startData.substring(11,13);
        System.out.println(hour);

    }


}
