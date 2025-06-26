import React, { useState } from 'react';
import { Image, Send, X } from 'lucide-react';

interface CreatePostProps {
  currentUser: any;
  onCreatePost: (content: string, image?: string) => void;
  onClose: () => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ currentUser, onCreatePost, onClose }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onCreatePost(content, image || undefined);
      setContent('');
      setImage('');
      setShowImageInput(false);
      onClose();
    }
  };

  const sampleImages = [
    'https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1674666/pexels-photo-1674666.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1769524/pexels-photo-1769524.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=600'
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-lg border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Create Post</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-700 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex items-start space-x-4 mb-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.username}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full h-32 bg-transparent text-white placeholder-gray-400 resize-none focus:outline-none text-lg"
                autoFocus
              />
            </div>
          </div>

          {showImageInput && (
            <div className="mb-4">
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Paste image URL or choose from samples below"
                className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-3"
              />
              <div className="grid grid-cols-4 gap-2">
                {sampleImages.map((imgUrl, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setImage(imgUrl)}
                    className="aspect-square rounded-lg overflow-hidden hover:ring-2 hover:ring-purple-500 transition-all"
                  >
                    <img src={imgUrl} alt={`Sample ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              {image && (
                <div className="mt-3">
                  <img src={image} alt="Preview" className="w-full h-48 object-cover rounded-xl" />
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-gray-700">
            <button
              type="button"
              onClick={() => setShowImageInput(!showImageInput)}
              className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-all"
            >
              <Image className="w-5 h-5" />
              <span>Add Image</span>
            </button>

            <button
              type="submit"
              disabled={!content.trim()}
              className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-6 py-2 rounded-xl font-semibold hover:from-purple-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all transform hover:scale-105 disabled:opacity-50 disabled:scale-100 flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Post</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;