package com.sr.platform.server.bigCat.bean;

public class BigCat {
    private String name;
    private String age;
    BigCat(){}
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }
    
    @Override
    public String toString() {
        return "BigCat{" +
                "name='" + name + '\'' +
                ", age='" + age + '\'' +
                '}';
    }
}
