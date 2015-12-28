package org.myfacebookapp;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONArray;
import org.json.JSONObject;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.facebook.api.FacebookException;
import com.facebook.api.FacebookRestClient;

import datastructure.Functions;
import datastructure.Names;

/**
 * Servlet implementation class AlbumServlet
 */
public class AlbumServlet extends AbstractFacebookServlet implements
		javax.servlet.Servlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public AlbumServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();

		FacebookRestClient facebook = getAuthenticatedFacebookClient(request,
				response);

		if (facebook != null) {
			String friendIdString = request
					.getParameter(Names.CLICKED_FRIEND_ID);
			long friendId = Long.parseLong(friendIdString);
			// List<Album> albums = Album.getAlbums(facebook, friendId);
			//        	
			// JSONArray jsonAlbums = new
			// JSONArray(convertToJSONObjectList(albums));
			String queryForAlbums = "SELECT aid, name, cover_pid, size FROM album WHERE owner = "
					+ friendId;
			try {
				long time = System.currentTimeMillis();
				
				Document albumsDoc = facebook.fql_query(queryForAlbums);

				String queryForPics = "SELECT pid, src_small FROM photo WHERE pid in (SELECT cover_pid FROM album WHERE owner = "
						+ friendId + ") ORDER BY pid ASC";
				Document picsDoc = facebook.fql_query(queryForPics);

				String jsonAlbumsString = convertToJSON(albumsDoc, picsDoc);
				
				System.out.println("Albumloadtime: " + (System.currentTimeMillis() - time) / 1000 + "s");
				System.out.println(jsonAlbumsString);
				
				response.getOutputStream().write(jsonAlbumsString.getBytes());

			} catch (FacebookException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		}
	}

	private static String convertToJSON(Document albumDoc, Document picDoc) {
		NodeList nodes = albumDoc.getElementsByTagName("album");
		String result = "[";
		for (int i = 0; i < nodes.getLength(); i++) {
			Node n = nodes.item(i);
			result += processNode(n, picDoc);
			if (i == nodes.getLength() - 1)
				result += "}";
			else
				result += "},";

		}
		result += "]";
		return result;
	}

	private static String processNode(Node n, Document picDoc) {
		String result = "{";
		Node aidNode = n.getFirstChild();
		Node nameNode = aidNode.getNextSibling();
		Node cover_pidNode = nameNode.getNextSibling();
		Node sizeNode = cover_pidNode.getNextSibling();

		String aidText = "\"" + aidNode.getNodeName() + "\":"
				+  "\"" +aidNode.getFirstChild().getNodeValue() + "\"";
		String nameText = "\"" + nameNode.getNodeName() + "\":\""
				+ nameNode.getFirstChild().getNodeValue() + "\"";
		String cover_pidText = transformPicIDToURLInJSON(cover_pidNode, picDoc);
		String sizeText = "\"" + sizeNode.getNodeName() + "\":"
				+ sizeNode.getFirstChild().getNodeValue();

		result += aidText + "," + nameText + "," + cover_pidText + ","
				+ sizeText;

		return result;
	}

	private static String transformPicIDToURLInJSON(Node cover_pidNode,
			Document picDoc) {

		String picID = cover_pidNode.getFirstChild().getNodeValue();

		NodeList nodes = picDoc.getElementsByTagName("photo");

		for (int i = 0; i < nodes.getLength(); i++) {
			Node n = nodes.item(i);

			Node pidNode = n.getFirstChild();
			String currentPicID = pidNode.getFirstChild().getNodeValue();
			
			if (currentPicID.equals(picID)) {
				Node picNode = pidNode.getNextSibling();

				String result = "";
				if (picNode.getFirstChild() != null) {
					result = "\"" + picNode.getNodeName() + "\":\""
							+ picNode.getFirstChild().getNodeValue() + "\"";
				} else {
					result = "\"" + picNode.getNodeName() + "\":\""
							+ "Images/unknown.jpg" + "\"";
				}
				return result;
			}

		}

		return null;
	}

	

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
