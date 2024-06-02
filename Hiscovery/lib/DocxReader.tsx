import React, { useState, useEffect } from "react";
import { Text, View, Dimensions } from "react-native";
import { WebView } from "react-native-webview";
import mammoth from "mammoth";
import * as Speech from 'expo-speech'; // Import expo-speech
import { COLORS, icons } from "../constants";
import { Button, } from 'react-native-elements';

const DocxReader = ({ docxUrl }) => {
  const [htmlContent, setHtmlContent] = useState(null);
  const [textContainerWidth, setTextContainerWidth] = useState(Dimensions.get("window").width);
  const [plainText, setPlainText] = useState("");

  useEffect(() => {
    const fetchDocxAndConvertToHtml = async () => {
      try {
        const response = await fetch(docxUrl);
        const docxData = await response.arrayBuffer();
        const result = await mammoth.convertToHtml({ arrayBuffer: docxData });
        setHtmlContent(result.value);

        const plainTextResult = await mammoth.extractRawText({
          arrayBuffer: docxData,
        });
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
    Speech.stop();
    // Speech.speak('Hello World!, This is the article page!');
    Speech.speak(plainText);
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
          <Button
            buttonStyle={{
              backgroundColor: COLORS.darkRed,
              borderRadius: 50,
              padding: 10,
              width: 50,
              height: 50,
              margin: 10
            }}
            onPress={handleReadAloud}
            icon={
              <icons.speaker fill='white' />
            }
          />
        </>
      ) : (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>Loading...</Text>
        </View>
      )}
    </View>
  );
};

export default DocxReader;