'use client';
import React, { useEffect, useRef } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { vim } from '@replit/codemirror-vim';
import { javascript } from '@codemirror/lang-javascript';

export default function VimEditor() {
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const state = EditorState.create({
      doc: '// Start typing with Vim!',
      extensions: [basicSetup, vim(), javascript()],
    });

    const view = new EditorView({
      state,
      parent: editorRef.current,
    });

    return () => view.destroy();
  }, []);

  return <div ref={editorRef} className="border p-2 rounded-md" />;
}

