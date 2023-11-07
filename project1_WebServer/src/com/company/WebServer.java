package com.company;

import java.util.*;
import java.net.*;
import java.io.*;



public class WebServer {

    public static void main(String[] args) {

        try {
            ServerSocket serverSock = new ServerSocket(8888);//Fill in here; *mission 1

            while (true) {
                Socket connectionSock = serverSock.accept();//Fill in Here

                //construct an object to process the HTTP request message.
                HttpRequest request = new HttpRequest(connectionSock);

                Thread thread = new Thread(request);//Fill in Here; *mission 2
                thread.start();

            }
        }
        catch (IOException e) {
            System.out.println(e.getMessage());
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
    }
