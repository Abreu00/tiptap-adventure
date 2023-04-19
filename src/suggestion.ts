import { VueRenderer } from "@tiptap/vue-3";
import { PluginKey } from "@tiptap/pm/state";
import tippy from "tippy.js";

import MentionList from "./components/MentionList.vue";

type SuggestionKeyTypes = "mention-suggestions" | "hashtag-suggestions";

const mentionSuggestionList = [
  "Lea Thompson",
  "Cyndi Lauper",
  "Tom Cruise",
  "Madonna",
  "Jerry Hall",
  "Joan Collins",
  "Winona Ryder",
  "Christina Applegate",
  "Alyssa Milano",
  "Molly Ringwald",
  "Ally Sheedy",
  "Debbie Harry",
  "Olivia Newton-John",
  "Elton John",
  "Michael J. Fox",
  "Axl Rose",
  "Emilio Estevez",
  "Ralph Macchio",
  "Rob Lowe",
  "Jennifer Grey",
  "Mickey Rourke",
  "John Cusack",
  "Matthew Broderick",
  "Justine Bateman",
  "Lisa Bonet",
];

const hashtagSuggestionList = [
  "redflags",
  "greenflags",
  "action",
  "start",
  "stop",
  "topic",
  "question",
  "bug",
];

export default function defineSuggestions(key: SuggestionKeyTypes) {
  return {
    items: ({ query }) => {
      return (
        key === "mention-suggestions"
          ? mentionSuggestionList
          : hashtagSuggestionList
      )
        .filter((item) => item.toLowerCase().startsWith(query.toLowerCase()))
        .slice(0, 5);
    },
    pluginKey: new PluginKey(key),

    render: () => {
      let component;
      let popup;

      return {
        onStart: (props) => {
          component = new VueRenderer(MentionList, {
            // using vue 2:
            // parent: this,
            // propsData: props,
            // using vue 3:
            props,
            editor: props.editor,
          });

          if (!props.clientRect) {
            return;
          }

          popup = tippy("body", {
            getReferenceClientRect: props.clientRect,
            appendTo: () => document.body,
            content: component.element,
            showOnCreate: true,
            interactive: true,
            trigger: "manual",
            placement: "bottom-start",
          });
        },

        onUpdate(props) {
          component.updateProps(props);

          if (!props.clientRect) {
            return;
          }

          popup[0].setProps({
            getReferenceClientRect: props.clientRect,
          });
        },

        onKeyDown(props) {
          if (props.event.key === "Escape") {
            popup[0].hide();

            return true;
          }

          return component.ref?.onKeyDown(props);
        },

        onExit() {
          console.log("destroy");
          popup[0].destroy();
          component.destroy();
        },
      };
    },
  };
}
