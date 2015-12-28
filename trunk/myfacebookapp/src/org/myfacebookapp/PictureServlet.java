package org.myfacebookapp;

import java.io.IOException;
import java.util.StringTokenizer;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.facebook.api.FacebookException;
import com.facebook.api.FacebookRestClient;

import datastructure.Names;

/**
 * Servlet implementation class PictureServlet
 */
public class PictureServlet extends AbstractFacebookServlet implements
		javax.servlet.Servlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public PictureServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		FacebookRestClient facebook = getAuthenticatedFacebookClient(request,
				response);

		if (facebook != null) {
			String albumsIdsString = request
					.getParameter(Names.TO_VIEW_ALBUM_IDs);
			//albumsIdsString = "3384797974323350824|3384797974323341450";
			StringTokenizer t = new StringTokenizer(albumsIdsString, Names.ALBUM_ID_SEPERATER);
			String whereCondition = "";
			while(t.hasMoreTokens()){
				whereCondition += "aid =" + t.nextToken() + " OR ";
			}
			whereCondition = whereCondition.substring(0, whereCondition.length() - 4);

			String queryPics = "Select pid, aid, src, src_big from photo where "
					+ whereCondition;
			
			
			System.out.println(queryPics);
			long time = System.currentTimeMillis();
			Document doc;
			try {
				doc = facebook.fql_query(queryPics);
			
			String jsonPicturesString  = convertToJSON(doc);
			
			System.out.println("timeLoadingPics: " + (System.currentTimeMillis()-time)/1000 +"s");
			
			
			response.getOutputStream().write(jsonPicturesString.getBytes());

			
			} catch (FacebookException e) {
				e.printStackTrace();
			}
		}
	}

	
	/**
	 /*
	 *<photo>
	    <pid>3384797974325238985</pid>
	    <aid>3384797974323350824</aid>
	    <src>http://photos-b.ak.fbcdn.net/photos-ak-snc1/v2076/6/110/788084691/s788084691_1973449_5195.jpg</src>
	    <src_big>http://photos-b.ak.fbcdn.net/photos-ak-snc1/v2076/6/110/788084691/n788084691_1973449_5195.jpg</src_big>
	  </photo> 
	 * param doc
	 * @return
	 */
	private static String convertToJSON(Document doc) {
		NodeList nodes = doc.getElementsByTagName("photo");
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
		Node pidNode = n.getFirstChild();
		Node aidNode = pidNode.getNextSibling();
		Node srcNode = aidNode.getNextSibling();
		Node srcBigNode = srcNode.getNextSibling();
		
		String pidText = "\"" + pidNode.getNodeName()+"\":" + pidNode.getFirstChild().getNodeValue();
		
		String aidText = "\"" + aidNode.getNodeName()+"\":" + aidNode.getFirstChild().getNodeValue();
		
		String srcText = "\"" + srcNode.getNodeName() +"\":\"" + srcNode.getFirstChild().getNodeValue() + "\"" ;
		
		String srcBigText = "\"" + srcBigNode.getNodeName() +"\":\"" + srcBigNode.getFirstChild().getNodeValue() + "\"" ;
		
		result += pidText +"," + aidText + "," + srcText + "," + srcBigText;
		
		return result;
	}
	
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
