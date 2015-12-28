package datastructure;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

public class Functions {

	/**
	 * Find tag in an NodeList. The value of the node has to be String
	 * @param n
	 * @param tagName
	 * @return
	 */
	public static String findStringItemValue(NodeList n, String tagName)
	{
		for(int i=0; i < n.getLength(); i++)
		{
			Node node = n.item(i);
			if( tagName.equals(node.getNodeName()) )
			{
				// The first child of the target node is the text node.
				// Thus, get its node value
				if( node.getFirstChild() != null )
				{
					return node.getFirstChild().getNodeValue();
				}
			}
		}
		
		return null;
	}
	/**
	 * Find tag in an NodeList. The value of the node has to be long
	 * @param n
	 * @param tagName
	 * @return
	 */
	public static long findLongItemValue(NodeList n, String tagName)
	{
		String value = findStringItemValue(n, tagName);
		return Long.valueOf(value).longValue();
	}
	
	
}
