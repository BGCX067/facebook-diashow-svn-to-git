package org.myfacebookapp;

import java.io.IOException;

import java.util.*;

import javax.servlet.ServletException;
import javax.servlet.http.*;

import org.w3c.dom.Document;

import com.facebook.api.*;

/**
 * Servlet implementation class for Servlet:
 * AbstractFacebookServlet
 *
 */
public class AbstractFacebookServlet
      extends javax.servlet.http.HttpServlet
      implements javax.servlet.Servlet
{
   protected static final String FB_APP_URL =
	   "http://apps.facebook.com/ntualbumslideshow/";

   protected static final String FB_APP_ADD_URL =
      "http://www.facebook.com/add.php?api_key=";

   protected static final String FB_API_KEY =
	 "ccd7fe5128f81802876fdfa087f6abbb"; 
   
   private static final String FB_SECRET_KEY =
	  "97697932b602ba6e8fa98458d7b4ada5"; 

   public AbstractFacebookServlet() {
      super();
   }

   /*
    * This method is used by all of the application's servlets
    * (or  web framework actions) to authenticate the app with
    * Facebook.
    */
   protected FacebookRestClient getAuthenticatedFacebookClient(
         HttpServletRequest request, HttpServletResponse response)
   {
      Facebook fb = new Facebook(request, response,
         FB_API_KEY, FB_SECRET_KEY);
      

      String next = request.getServletPath().substring(1);

      if (fb.requireLogin(next)) return null;
      
      return fb.getFacebookRestClient();
   }
    
}