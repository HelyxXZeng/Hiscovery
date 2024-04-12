import React, { useState, useEffect } from 'react';
import { Text, View, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import mammoth from 'mammoth';
import { supabase } from './supabase'; // Import Supabase client
import { COLORS } from '../constants';
import { NativeBaseProvider } from 'native-base';

const DocxReader = ({ docxUrl }) => {
  const [htmlContent, setHtmlContent] = useState(null);
  const [textContainerWidth, setTextContainerWidth] = useState(Dimensions.get('window').width);
  const [containerWidth, setContainerWidth] = useState(Dimensions.get('window').width * 0.9);

  useEffect(() => {
    const fetchDocxAndConvertToHtml = async () => {
      try {
        const response = await fetch(docxUrl);
        const docxData = await response.blob();
        const result = await mammoth.convertToHtml({ arrayBuffer: docxData });
        setHtmlContent(result.value);
      } catch (error) {
        console.error('Error reading or converting DOCX:', error);
      }
    };

    fetchDocxAndConvertToHtml();
  }, [docxUrl]);

  useEffect(() => {
    setTextContainerWidth(Dimensions.get('window').width - 15);
  }, []);

  const injectedJS = `

  // Adjust text size and alignment
  var style = document.createElement('style');
  style.innerHTML = 'body { font-size: 20px; text-align: justify; font-family: Roboto}'; // Adjust the font-size as desired
  document.head.appendChild(style);

  // Scale images to match text container width
var textContainerWidth = ${textContainerWidth};
var images = document.getElementsByTagName('img');
for (var i = 0; i < images.length; i++) {
  images[i].style.width = textContainerWidth + 'px';
  images[i].style.height = 'auto';

  // Create a new container for each image and set padding
  var imageContainer = document.createElement('div');
  imageContainer.style.paddingRight = '20px'; // Add padding to the right of each image container
  imageContainer.style.boxSizing = 'border-box'; // Ensure padding doesn't increase container width
  images[i].parentNode.insertBefore(imageContainer, images[i].nextSibling); // Insert image container after the image
  imageContainer.appendChild(images[i]); // Append image to the container
}

  // Wrap URL links in a container with specific styles
  var links = document.getElementsByTagName('a');
  for (var j = 0; j < links.length; j++) {
    var linkContainer = document.createElement('div');
    linkContainer.style.width = '100%'; // Set the container width to match the parent width
    linkContainer.style.overflow = 'hidden';
    linkContainer.style.textOverflow = 'ellipsis';
    linkContainer.style.whiteSpace = 'nowrap';

    links[j].parentNode.insertBefore(linkContainer, links[j]);
    linkContainer.appendChild(links[j]);
  }
  `;

  return (

    <View style={{ flex: 1 }}>
      {htmlContent ? (
        <WebView
          originWhitelist={['*']}
          source={{ html: htmlContent }}
          style={{ flex: 1 }}
          injectedJavaScript={injectedJS}
          javaScriptEnabled={true}
          scalesPageToFit={false}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Loading...</Text>
        </View>
      )}
    </View>

  );
};

export default DocxReader;
