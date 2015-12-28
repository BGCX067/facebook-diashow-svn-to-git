package org.myfacebookapp;

import java.io.IOException;
import java.io.StringWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.*;

import java.util.*;

import org.apache.catalina.Session;
import org.json.JSONArray;
import org.json.JSONObject;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.facebook.api.*;
import com.facebook.api.schema.FriendsGetResponse;
import com.sun.org.apache.xml.internal.serialize.OutputFormat;
import com.sun.org.apache.xml.internal.serialize.XMLSerializer;

import datastructure.Names;


/**
 * Servlet implementation class for Servlet: MainPageServlet
 * 
 * @web.servlet name="MainPageServlet" display-name="MainPageServlet"
 * 
 * @web.servlet-mapping url-pattern="/"
 * 
 */
public class MainPageServlet extends AbstractFacebookServlet implements
		javax.servlet.Servlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public MainPageServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		 FacebookRestClient normalFacebookClient = getAuthenticatedFacebookClient(request,
		 response);
		 
		HttpSession session = request.getSession(); 
		
		try {
			
			if (normalFacebookClient != null) {

				// Store the facebook object for the jsp usage
				
				session.setAttribute(Names.FACEBOOK_OBJECT, normalFacebookClient);
				
				long myId = 14005261;

				myId = normalFacebookClient.users_getLoggedInUser();

				String query = "SELECT uid ,name, pic_big FROM user where uid in (select uid2 from friend where uid1 = "
						+ myId + ")";
				
				System.out.println(query);
				long time = System.currentTimeMillis();
				Document doc = normalFacebookClient.fql_query(query);
				String jsonString  = convertToJSON(doc);
				
				System.out.println("timeLoadingFriends: " + (System.currentTimeMillis()-time)/1000 +"s");
				
				session.setAttribute(Names.FRIENDS_JSON_STRING, jsonString);

				// request.getRequestDispatcher("/main_page.jsp").forward(request,
				// response);
				request.getRequestDispatcher("/index.jsp").forward(request,
						response);

			}
		} catch (FacebookException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	/**
	 * <user>
			<uid>909129</uid>
			<name>Shaaroni Leionaonapoina'ole Wong</name>
			<pic_big xsi:nil="true"/>
		</user>
		<user>
			<uid>1948228</uid>
			<name>Saly Sebastian</name>
			<pic_big>http://profile.ak.facebook.com/v229/1444/48/n1948228_4877.jpg</pic_big>
		</user>
		
		OUTPUT:
		
		[{"pic_big":"","name":"Shaaroni Leionaonapoina'ole Wong","uid":909129},
		{"pic_big":"http://profile.ak.facebook.com/v229/1444/48/n1948228_4877.jpg","name":"Saly Sebastian","uid":1948228}]
	 * @param doc
	 * @return
	 */
	private static String convertToJSON(Document doc) {
		NodeList nodes = doc.getElementsByTagName("user");
		String result = "[";
		for (int i = 0; i < nodes.getLength(); i++) {
			Node n = nodes.item(i);
			result += processNode(n);
			if(i ==nodes.getLength()-1) 
				result += "}";
			else
				result += "},";
				
		}
		result += "]";
		return result;
	}

	private static String processNode(Node n) {
		String result = "{";
		Node uidNode = n.getFirstChild();
		Node nameNode = uidNode.getNextSibling();
		Node picNode = nameNode.getNextSibling();
		
		String uidText = "\"" + uidNode.getNodeName()+"\":" + uidNode.getFirstChild().getNodeValue();
		
		String nameText = "\"" + nameNode.getNodeName() +"\":\"" + nameNode.getFirstChild().getNodeValue() + "\"" ;
		String picText = "";
		
		if(picNode.getFirstChild() != null)
			picText = "\"" + picNode.getNodeName() +"\":\"" + picNode.getFirstChild().getNodeValue() + "\"" ;
		else
			picText = "\"" + picNode.getNodeName() +"\":\"" + "Images/unknown.jpg" + "\"" ;
		
		result += uidText +"," + nameText + "," + picText;
		
		return result;
	}

	private void xmlDocumentToString(Document doc){
		OutputFormat format    = new OutputFormat (doc); 
	      // as a String
	      StringWriter stringOut = new StringWriter ();    
	      XMLSerializer serial   = new XMLSerializer (stringOut, 
	                                                  format);
	      try {
			serial.serialize(doc);
		} catch (IOException e) {
			e.printStackTrace();
		}
	      // Display the XML
	      System.out.println(stringOut.toString());
	}


	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
