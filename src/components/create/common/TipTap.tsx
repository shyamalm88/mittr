import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import Underline from "@tiptap/extension-underline";
import Code from "@tiptap/extension-code";
import Focus from "@tiptap/extension-focus";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import FormatBoldOutlinedIcon from "@mui/icons-material/FormatBoldOutlined";
import FormatItalicOutlinedIcon from "@mui/icons-material/FormatItalicOutlined";
import StrikethroughSOutlinedIcon from "@mui/icons-material/StrikethroughSOutlined";
import HighlightAltOutlinedIcon from "@mui/icons-material/HighlightAltOutlined";
import FormatAlignLeftOutlinedIcon from "@mui/icons-material/FormatAlignLeftOutlined";
import FormatAlignCenterOutlinedIcon from "@mui/icons-material/FormatAlignCenterOutlined";
import FormatAlignRightOutlinedIcon from "@mui/icons-material/FormatAlignRightOutlined";
import FormatAlignJustifyOutlinedIcon from "@mui/icons-material/FormatAlignJustifyOutlined";
import FormatUnderlinedOutlinedIcon from "@mui/icons-material/FormatUnderlinedOutlined";
import SuperscriptOutlinedIcon from "@mui/icons-material/SuperscriptOutlined";
import SubscriptOutlinedIcon from "@mui/icons-material/SubscriptOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import FormatListNumberedOutlinedIcon from "@mui/icons-material/FormatListNumberedOutlined";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import LinkOffOutlinedIcon from "@mui/icons-material/LinkOffOutlined";
import { ComponentInputProps } from "../../../types";

const MenuBar = ({ editor, editable }: any) => {
  const setLink = React.useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <>
      <div style={{ display: "flex" }}>
        {editable && (
          <Stack
            direction="row"
            alignContent="center"
            flexWrap="wrap"
            spacing={0.5}
            useFlexGap
          >
            <ButtonGroup
              size="small"
              disableElevation
              variant="outlined"
              color="primary"
            >
              <Button
                size="small"
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className={
                  editor.isActive("heading", { level: 1 }) ? "is-active" : ""
                }
              >
                <Typography variant="button" component="small">
                  h1
                </Typography>
              </Button>
              <Button
                size="small"
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className={
                  editor.isActive("heading", { level: 2 }) ? "is-active" : ""
                }
              >
                <Typography variant="button" component="small">
                  h2
                </Typography>
              </Button>
            </ButtonGroup>
            <ButtonGroup
              size="small"
              disableElevation
              variant="outlined"
              color="primary"
            >
              <Button
                size="small"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive("bold") ? "is-active" : ""}
              >
                <FormatBoldOutlinedIcon fontSize="small" />
              </Button>
              <Button
                size="small"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive("italic") ? "is-active" : ""}
              >
                <FormatItalicOutlinedIcon fontSize="small" />
              </Button>
              <Button
                size="small"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={editor.isActive("strike") ? "is-active" : ""}
              >
                <StrikethroughSOutlinedIcon fontSize="small" />
              </Button>
              <Button
                size="small"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={editor.isActive("underline") ? "is-active" : ""}
              >
                <FormatUnderlinedOutlinedIcon fontSize="small" />
              </Button>
            </ButtonGroup>
            <ButtonGroup
              size="small"
              disableElevation
              variant="outlined"
              color="primary"
            >
              <Button
                size="small"
                onClick={() => editor.chain().focus().toggleSuperscript().run()}
                className={editor.isActive("superscript") ? "is-active" : ""}
              >
                <SuperscriptOutlinedIcon fontSize="small" />
              </Button>
              <Button
                size="small"
                onClick={() => editor.chain().focus().toggleSubscript().run()}
                className={editor.isActive("subscript") ? "is-active" : ""}
              >
                <SubscriptOutlinedIcon fontSize="small" />
              </Button>
            </ButtonGroup>
            <ButtonGroup
              size="small"
              disableElevation
              variant="outlined"
              color="primary"
            >
              <Button
                size="small"
                onClick={() => editor.chain().focus().toggleCode().run()}
                className={editor.isActive("code") ? "is-active" : ""}
              >
                <CodeOutlinedIcon fontSize="small" />
              </Button>
              <Button
                size="small"
                onClick={() => editor.chain().focus().toggleHighlight().run()}
                className={editor.isActive("highlight") ? "is-active" : ""}
              >
                <HighlightAltOutlinedIcon fontSize="small" />
              </Button>
            </ButtonGroup>
            <ButtonGroup
              size="small"
              disableElevation
              variant="outlined"
              color="primary"
            >
              <Button
                size="small"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive("orderedList") ? "is-active" : ""}
              >
                <FormatListNumberedOutlinedIcon />
              </Button>

              <Button
                size="small"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive("bulletList") ? "is-active" : ""}
              >
                <FormatListBulletedOutlinedIcon />
              </Button>
            </ButtonGroup>
            <ButtonGroup
              size="small"
              disableElevation
              variant="outlined"
              color="primary"
            >
              <Button
                size="small"
                onClick={() =>
                  editor.chain().focus().setTextAlign("left").run()
                }
                className={
                  editor.isActive({ textAlign: "left" }) ? "is-active" : ""
                }
              >
                <FormatAlignLeftOutlinedIcon fontSize="small" />
              </Button>
              <Button
                size="small"
                onClick={() =>
                  editor.chain().focus().setTextAlign("center").run()
                }
                className={
                  editor.isActive({ textAlign: "center" }) ? "is-active" : ""
                }
              >
                <FormatAlignCenterOutlinedIcon fontSize="small" />
              </Button>
              <Button
                size="small"
                onClick={() =>
                  editor.chain().focus().setTextAlign("right").run()
                }
                className={
                  editor.isActive({ textAlign: "right" }) ? "is-active" : ""
                }
              >
                <FormatAlignRightOutlinedIcon fontSize="small" />
              </Button>
              <Button
                size="small"
                onClick={() =>
                  editor.chain().focus().setTextAlign("justify").run()
                }
                className={
                  editor.isActive({ textAlign: "justify" }) ? "is-active" : ""
                }
              >
                <FormatAlignJustifyOutlinedIcon fontSize="small" />
              </Button>
            </ButtonGroup>
            <ButtonGroup
              size="small"
              disableElevation
              variant="outlined"
              color="primary"
            >
              <Button
                size="small"
                onClick={setLink}
                className={editor.isActive("link") ? "is-active" : ""}
              >
                <InsertLinkOutlinedIcon fontSize="small" />
              </Button>
            </ButtonGroup>
          </Stack>
        )}
      </div>
    </>
  );
};

export default function Editor({
  placeHolder,
  handleChange,
  handleEditorClick,
  handleEditorBlur,
  editable,
  dataContext,
}: ComponentInputProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight.configure({ multicolor: true }),
      Focus.configure({
        className: "has-focus",
        mode: "all",
      }),
      Superscript,
      Subscript,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: placeHolder,
      }),
    ],
    autofocus: false,
    content: dataContext,
    onUpdate: handleChange,
  });

  return (
    <ClickAwayListener onClickAway={handleEditorBlur} mouseEvent="onMouseDown">
      <div
        style={{
          paddingLeft: "10px",
          paddingRight: "10px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <EditorContent
          editor={editor}
          style={{ minHeight: "100px" }}
          onClick={handleEditorClick}
        />
        <MenuBar editor={editor} editable={editable} />
      </div>
    </ClickAwayListener>
  );
}
