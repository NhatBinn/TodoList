package com.example.todolist.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class Config implements WebMvcConfigurer {
     @Override
     public void addCorsMappings(CorsRegistry registry) {
          registry.addMapping("/api/**") // Cho phép truy cập cho tất cả các endpoint bắt đầu bằng "/api/"
                    .allowedOrigins("http://localhost:3000") // Cho phép truy cập từ origin "http://localhost:3000"
                    .allowedMethods("GET", "POST", "PUT", "DELETE"); // Cho phép sử dụng các phương thức GET, POST, PUT,
                                                                     // DELETE
     }
}
