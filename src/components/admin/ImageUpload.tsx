"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState, useRef } from "react";
import { Image as ImageIcon, Upload, X, Loader2 } from "lucide-react";

interface ImageUploadProps {
    onUploadComplete: (storageId: string) => void;
    currentImage?: string;
}

export default function ImageUpload({ onUploadComplete, currentImage }: ImageUploadProps) {
    const { user } = useUser();
    const generateUploadUrl = useMutation(api.landing.generateUploadUrl);
    const [isUploading, setIsUploading] = useState(false);
    const [preview, setPreview] = useState(currentImage || "");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        // Local preview
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        try {
            // 1. Get upload URL
            const postUrl = await generateUploadUrl({});

            // 2. Post file to Convex Storage
            const result = await fetch(postUrl, {
                method: "POST",
                headers: { "Content-Type": file.type },
                body: file,
            });

            const { storageId } = await result.json();

            // 3. Callback to parent
            onUploadComplete(storageId);
        } catch (error) {
            console.error(error);
            alert("Upload failed. Please try again.");
            setPreview(currentImage || "");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div
                onClick={() => fileInputRef.current?.click()}
                className={`relative aspect-video w-full border-2 border-dashed rounded-[2rem] overflow-hidden cursor-pointer group transition-all ${isUploading ? "border-brand-blue/50" : "border-white/5 hover:border-brand-blue/30"
                    }`}
            >
                {preview ? (
                    <>
                        <img src={preview} alt="Upload preview" className="w-full h-full object-cover opacity-50 group-hover:opacity-40 transition-opacity" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                            {isUploading ? (
                                <Loader2 className="w-8 h-8 text-brand-blue animate-spin" />
                            ) : (
                                <>
                                    <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 group-hover:scale-110 transition-transform">
                                        <Upload className="w-6 h-6 text-white" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white shadow-2xl">Change Image</span>
                                </>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                            <ImageIcon className="w-6 h-6 text-zinc-600" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 group-hover:text-brand-blue transition-colors">Select Media</span>
                    </div>
                )}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleUpload}
                    className="hidden"
                    accept="image/*"
                />
            </div>
            {preview && !isUploading && (
                <button
                    onClick={() => { setPreview(""); onUploadComplete(""); }}
                    className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-zinc-500 hover:text-red-500 transition-colors mx-auto"
                >
                    <X className="w-3 h-3" /> Remove Asset
                </button>
            )}
        </div>
    );
}
