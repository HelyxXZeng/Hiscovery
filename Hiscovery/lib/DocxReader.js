import React, { useState, useEffect } from "react";
import { Text, View, Button, Dimensions } from "react-native";
import { WebView } from "react-native-webview";
import mammoth from "mammoth";
import Tts from "react-native-tts";
import { COLORS } from "../constants";

const DocxReader = ({ docxUrl }) => {
  const [htmlContent, setHtmlContent] = useState(null);
  const [textContainerWidth, setTextContainerWidth] = useState(
    Dimensions.get("window").width
  );
  const [plainText, setPlainText] = useState("");

  useEffect(() => {
    const fetchDocxAndConvertToHtml = async () => {
      try {
        const response = await fetch(docxUrl);
        const docxData = await response.arrayBuffer();
        const result = await mammoth.convertToHtml({ arrayBuffer: docxData });
        const plainTextResult = await mammoth.extractRawText({
          arrayBuffer: docxData,
        });
        setHtmlContent(result.value);
        setPlainText(plainTextResult.value);
      } catch (error) {
        console.error("Error reading or converting DOCX:", error);
      }
    };

    fetchDocxAndConvertToHtml();
  }, [docxUrl]);

  useEffect(() => {
    setTextContainerWidth(Dimensions.get("window").width - 15);
  }, []);

  const handleReadAloud = () => {
    Tts.stop();
    Tts.speak(plainText);
  };

  const injectedJS = `
    var style = document.createElement('style');
    style.innerHTML = 'body { font-size: 20px; text-align: justify; font-family: Roboto}';
    document.head.appendChild(style);

    var textContainerWidth = ${textContainerWidth};
    var images = document.getElementsByTagName('img');
    for (var i = 0; i < images.length; i++) {
      images[i].style.width = textContainerWidth + 'px';
      images[i].style.height = 'auto';

      var imageContainer = document.createElement('div');
      imageContainer.style.paddingRight = '20px';
      imageContainer.style.boxSizing = 'border-box';
      images[i].parentNode.insertBefore(imageContainer, images[i].nextSibling);
      imageContainer.appendChild(images[i]);
    }

    var links = document.getElementsByTagName('a');
    for (var j = 0; j < links.length; j++) {
      var linkContainer = document.createElement('div');
      linkContainer.style.width = '100%';
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
        <>
          <WebView
            originWhitelist={["*"]}
            source={{ html: htmlContent }}
            style={{ flex: 1 }}
            injectedJavaScript={injectedJS}
            javaScriptEnabled={true}
            scalesPageToFit={false}
            scrollEnabled={false}
          />
          <Button title="Read" onPress={handleReadAloud} />
        </>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Loading...</Text>
        </View>
      )}
    </View>
  );
};

export default DocxReader;
