"use client";

import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Link as LinkIcon,
    Heading1,
    Heading2,
    Undo,
    Redo
} from "lucide-react";

interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
}

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) return null;

    const btnClass = (active: boolean) => `p-2 rounded-lg transition-colors ${active ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/20" : "text-zinc-500 hover:bg-white/5 hover:text-white"
        }`;

    const addLink = () => {
        const url = window.prompt("Enter URL");
        if (url) editor.chain().focus().setLink({ href: url }).run();
    };

    return (
        <div className="flex flex-wrap items-center gap-2 p-4 border-b border-white/5 bg-black/40 rounded-t-2xl">
            <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btnClass(editor.isActive("bold"))}><Bold className="w-4 h-4" /></button>
            <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btnClass(editor.isActive("italic"))}><Italic className="w-4 h-4" /></button>
            <div className="w-px h-6 bg-white/5 mx-2"></div>
            <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={btnClass(editor.isActive("heading", { level: 1 }))}><Heading1 className="w-4 h-4" /></button>
            <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btnClass(editor.isActive("heading", { level: 2 }))}><Heading2 className="w-4 h-4" /></button>
            <div className="w-px h-6 bg-white/5 mx-2"></div>
            <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btnClass(editor.isActive("bulletList"))}><List className="w-4 h-4" /></button>
            <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btnClass(editor.isActive("orderedList"))}><ListOrdered className="w-4 h-4" /></button>
            <div className="w-px h-6 bg-white/5 mx-2"></div>
            <button type="button" onClick={addLink} className={btnClass(editor.isActive("link"))}><LinkIcon className="w-4 h-4" /></button>
            <div className="ml-auto flex items-center gap-2">
                <button type="button" onClick={() => editor.chain().focus().undo().run()} className={btnClass(false)}><Undo className="w-4 h-4" /></button>
                <button type="button" onClick={() => editor.chain().focus().redo().run()} className={btnClass(false)}><Redo className="w-4 h-4" /></button>
            </div>
        </div>
    );
};

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: "text-brand-blue underline cursor-pointer",
                },
            }),
        ],
        content: content,
        editorProps: {
            attributes: {
                class: "prose prose-invert prose-sm max-w-none focus:outline-none min-h-[300px] p-6 font-body leading-relaxed",
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    if (!isMounted) {
        return <div className="h-[300px] w-full bg-black/20 animate-pulse rounded-2xl border border-white/5" />;
    }

    return (
        <div className="border border-white/10 rounded-2xl bg-black/20 overflow-hidden focus-within:border-brand-blue/30 transition-colors">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
}
