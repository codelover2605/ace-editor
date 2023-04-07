let editorElement = document.querySelector("#editor");
var editor = ace.edit(editorElement);
var initialValue = `public class Main {
  public static void main(String[] args) {

  }
}`;

editor.setValue(initialValue);
editor.setTheme("ace/theme/GitHub");
editor.session.setMode("ace/mode/java");
editor.setOptions({
  showPrintMargin: false,
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  enableSnippets: true,
  highlightActiveLine: true,
  highlightSelectedWord: true,
  wrap: true,
  tabSize: 2
});

var langTools = ace.require("ace/ext/language_tools");

var staticWordCompleter = {
  getCompletions: function (editor, session, pos, prefix, callback) {
    var wordList = [
      { caption: "ArrayList", value: "ArrayList", meta: "class" },
      { caption: "LinkedList", value: "LinkedList", meta: "class" },
      { caption: "List", value: "List", meta: "interface" },
      { caption: "Set", value: "Set", meta: "interface" },
      { caption: "HashSet", value: "HashSet", meta: "class" },
      { caption: "TreeSet", value: "TreeSet", meta: "class" },
      { caption: "Map", value: "Map", meta: "interface" },
      { caption: "HashMap", value: "HashMap", meta: "class" },
      { caption: "TreeMap", value: "TreeMap", meta: "class" },
      { caption: "Iterator", value: "Iterator", meta: "interface" },
      { caption: "Collections", value: "Collections", meta: "class" },
      { caption: "Integer", value: "Integer", meta: "class" },
      { caption: "Double", value: "Double", meta: "class" },
      { caption: "String", value: "String", meta: "class" }
    ];
    callback(null, wordList.filter(function (word) {
      return word.value.indexOf(prefix) === 0;
    }));
  }
};

var keywordCompleter = {
  getCompletions: function (editor, session, pos, prefix, callback) {
    var keywords = [
      "abstract", "assert", "boolean", "break", "byte", "case", "catch", "char", "class",
      "const", "continue", "default", "do", "double", "else", "enum", "extends", "false",
      "final", "finally", "float", "for", "if", "implements", "import", "instanceof", "int",
      "interface", "long", "native", "new", "null", "package", "private", "protected", "public",
      "return", "short", "static", "strictfp", "super", "switch", "synchronized", "this", "throw",
      "throws", "transient", "true", "try", "void", "volatile", "while"
    ];
    var completions = [];
    for (var i = 0; i < keywords.length; i++) {
      completions.push({
        value: keywords[i],
        meta: "keyword"
      });
    }
    callback(null, completions);
  }
};

langTools.setCompleters([langTools.snippetCompleter, staticWordCompleter, keywordCompleter]);
