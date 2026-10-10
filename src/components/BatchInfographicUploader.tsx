import { apiFetch } from '../services/request';
import React, { useState, useRef } from 'react';
import {
  X, UploadCloud, CheckCircle2, AlertCircle, RefreshCw,
  FolderUp, Image as ImageIcon, Trash2, Check, ArrowRight
} from 'lucide-react';
import { ALL_36_INFOGRAPHICS, InfographicLesson } from '../data/infographicsData';

interface BatchInfographicUploaderProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadCompleted: (updatedFilenames: string[]) => void;
  existingFiles: Set<string>;
}

interface SelectedUploadItem {
  file: File;
  previewUrl: string;
  selectedLessonId: string;
}

// Smart matcher to detect which lesson an uploaded file belongs to
function guessLessonFromFile(fileName: string): InfographicLesson | undefined {
  const clean = fileName.toLowerCase().replace(/[-_.]/g, ' ');

  // Exact filename match
  const exact = ALL_36_INFOGRAPHICS.find(l =>
    l.filename.toLowerCase() === fileName.toLowerCase() ||
    l.filename.toLowerCase().replace(/\.[^/.]+$/, '') === fileName.toLowerCase().replace(/\.[^/.]+$/, '')
  );
  if (exact) return exact;

  // Review chapter checks (e.g., "on tap 1", "on tap chuong 1", "2z", "ontap")
  for (let ch = 1; ch <= 9; ch++) {
    const romanNums = ['', 'i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix'];
    const roman = romanNums[ch];
    if (
      (clean.includes(`on tap`) || clean.includes(`ôn tập`)) &&
      (clean.includes(`${ch}`) || clean.includes(`chuong ${roman}`) || clean.includes(`chương ${roman}`))
    ) {
      const rev = ALL_36_INFOGRAPHICS.find(l => l.isReview && l.chapterNumber === ch);
      if (rev) return rev;
    }
  }

  // Lesson number match (e.g., "bai 2", "bài 02", "bai2", "b02", "lesson 2")
  for (let num = 1; num <= 27; num++) {
    const numPadded = num < 10 ? `0${num}` : `${num}`;
    const patterns = [
      new RegExp(`\\b(bai|bài|b|b0|lesson)\\s*0?${num}\\b`, 'i'),
      new RegExp(`\\b${numPadded}\\b`),
      new RegExp(`^${num}\\b`)
    ];
    if (patterns.some(p => p.test(clean))) {
      const match = ALL_36_INFOGRAPHICS.find(l => !l.isReview && l.lessonNumber === num);
      if (match) return match;
    }
  }

  // Topic keywords match
  if (clean.includes('menh de') || clean.includes('mệnh đề')) return ALL_36_INFOGRAPHICS.find(l => l.id === 'info-bai-01');
  if (clean.includes('tap hop') || clean.includes('tập hợp')) return ALL_36_INFOGRAPHICS.find(l => l.id === 'info-bai-02');
  if (clean.includes('bpt') || clean.includes('bất phương trình')) return ALL_36_INFOGRAPHICS.find(l => l.id === 'info-bai-03');
  if (clean.includes('he bpt') || clean.includes('hệ bất phương trình')) return ALL_36_INFOGRAPHICS.find(l => l.id === 'info-bai-04');
  if (clean.includes('luong giac') || clean.includes('lượng giác')) return ALL_36_INFOGRAPHICS.find(l => l.id === 'info-bai-05');
  if (clean.includes('he thuc luong') || clean.includes('hệ thức lượng')) return ALL_36_INFOGRAPHICS.find(l => l.id === 'info-bai-06');
  if (clean.includes('vecto') || clean.includes('vectơ')) return ALL_36_INFOGRAPHICS.find(l => l.id === 'info-bai-07');
  if (clean.includes('sai so') || clean.includes('sai số')) return ALL_36_INFOGRAPHICS.find(l => l.id === 'info-bai-12');
  if (clean.includes('ham so') || clean.includes('hàm số')) return ALL_36_INFOGRAPHICS.find(l => l.id === 'info-bai-15');
  if (clean.includes('parabol') || clean.includes('bac hai')) return ALL_36_INFOGRAPHICS.find(l => l.id === 'info-bai-16');
  if (clean.includes('duong thang') || clean.includes('đường thẳng')) return ALL_36_INFOGRAPHICS.find(l => l.id === 'info-bai-19');
  if (clean.includes('duong tron') || clean.includes('đường tròn')) return ALL_36_INFOGRAPHICS.find(l => l.id === 'info-bai-21');
  if (clean.includes('conic')) return ALL_36_INFOGRAPHICS.find(l => l.id === 'info-bai-22');
  if (clean.includes('quy tac dem') || clean.includes('quy tắc đếm')) return ALL_36_INFOGRAPHICS.find(l => l.id === 'info-bai-23');
  if (clean.includes('newton') || clean.includes('nhị thức')) return ALL_36_INFOGRAPHICS.find(l => l.id === 'info-bai-25');
  if (clean.includes('xac suat') || clean.includes('xác suất')) return ALL_36_INFOGRAPHICS.find(l => l.id === 'info-bai-26');

  return undefined;
}

export const BatchInfographicUploader: React.FC<BatchInfographicUploaderProps> = ({
  isOpen,
  onClose,
  onUploadCompleted,
  existingFiles
}) => {
  const [items, setItems] = useState<SelectedUploadItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultMsg, setResultMsg] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFilesChosen = (files: FileList | File[]) => {
    if (!files || files.length === 0) return;

    const newItems: SelectedUploadItem[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('image/')) continue;
      const previewUrl = URL.createObjectURL(file);
      const guessed = guessLessonFromFile(file.name);
      newItems.push({
        file,
        previewUrl,
        selectedLessonId: guessed ? guessed.id : ALL_36_INFOGRAPHICS[0].id
      });
    }

    setItems(prev => [...prev, ...newItems]);
    setResultMsg('');
  };

  const handleLessonChange = (index: number, newLessonId: string) => {
    setItems(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], selectedLessonId: newLessonId };
      return copy;
    });
  };

  const handleRemoveItem = (index: number) => {
    setItems(prev => {
      const copy = [...prev];
      URL.revokeObjectURL(copy[index].previewUrl);
      copy.splice(index, 1);
      return copy;
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleFilesChosen(e.dataTransfer.files);
    }
  };

  const handleUploadAll = async () => {
    if (items.length === 0) return;
    setIsUploading(true);
    setProgress(0);
    setResultMsg('');

    try {
      const payloads: { filename: string; lessonId: string; base64Data: string }[] = [];
      const updatedFilenames: string[] = [];

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const targetLesson = ALL_36_INFOGRAPHICS.find(l => l.id === item.selectedLessonId) || ALL_36_INFOGRAPHICS[0];
        
        // Target filename preserves lesson target so it immediately displays on that card
        const targetFilename = targetLesson.filename;
        updatedFilenames.push(targetFilename);

        const base64Data = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(item.file);
        });

        payloads.push({
          filename: targetFilename,
          lessonId: targetLesson.id,
          base64Data
        });

        setProgress(Math.round(((i + 1) / items.length) * 50));
      }

      // Send to server in batches
      const batchSize = 1;
      let totalSuccess = 0;
      for (let i = 0; i < payloads.length; i += batchSize) {
        const chunk = payloads.slice(i, i + batchSize);
        const res = await apiFetch('/api/batch-upload-infographics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ files: chunk })
        });
        if (!res.ok) throw new Error((await res.json()).error || 'Tải ảnh thất bại.');
        if (res.ok) {
          const data = await res.json();
          totalSuccess += data.uploadedCount || chunk.length;
        }
        setProgress(50 + Math.round(((i + chunk.length) / payloads.length) * 50));
      }

      setResultMsg(`🎉 Đã tải lên và lưu trữ thành công ${totalSuccess} ảnh Infographic của cô vào hệ thống! Trang sẽ cập nhật ảnh ngay.`);
      onUploadCompleted(updatedFilenames);
      
      // Clear items after small delay
      setTimeout(() => {
        setItems([]);
      }, 2000);
    } catch (err) {
      console.error(err);
      setResultMsg('Đã xảy ra lỗi trong quá trình tải lên. Vui lòng thử lại.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-3 sm:p-6 select-none">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-2xl backdrop-blur-xs">
              <FolderUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-white">Tải Lên Ảnh Infographic Của Cô</h3>
              <p className="text-xs text-emerald-100">Kéo thả hoặc chọn ảnh từ máy tính (PNG, JPG, WEBP) và gán trực tiếp theo bài học</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Guide banner */}
          <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-4 text-xs text-emerald-900 leading-relaxed flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-emerald-950">Cô có thể tải lên toàn bộ ảnh Infographic của mình cùng một lúc:</p>
              <p className="mt-1 text-emerald-800">
                Hệ thống tự động nhận diện tên bài (ví dụ: &quot;Bài 2.png&quot;, &quot;tap hop.jpg&quot;).
                Cô cũng có thể dễ dàng chọn chính xác bài học tương ứng cho từng ảnh trước khi bấm Lưu.
              </p>
            </div>
          </div>

          {/* Drag & Drop Area */}
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all ${
              isDragging
                ? 'border-emerald-600 bg-emerald-100/50 scale-[1.01]'
                : 'border-emerald-400 bg-emerald-50/40 hover:bg-emerald-50/70'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/png,image/jpeg,image/jpg,image/webp"
              onChange={(e) => e.target.files && handleFilesChosen(e.target.files)}
              className="hidden"
            />
            <div className="mx-auto w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3 shadow-xs">
              <UploadCloud className="w-7 h-7" />
            </div>
            <h4 className="font-extrabold text-slate-800 text-sm sm:text-base">
              Bấm để chọn hoặc kéo thả ảnh của cô vào đây
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Hỗ trợ cùng lúc nhiều tệp PNG, JPG, JPEG, WEBP · Dung lượng tối đa 20MB/ảnh
            </p>
          </div>

          {/* Selected Files List with Lesson Mapping */}
          {items.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  Danh sách ảnh đã chọn ({items.length} ảnh):
                </span>
                <button
                  type="button"
                  onClick={() => setItems([])}
                  className="text-xs text-rose-600 hover:underline cursor-pointer"
                >
                  Xóa tất cả
                </button>
              </div>

              <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                {items.map((item, idx) => {
                  const currentLesson = ALL_36_INFOGRAPHICS.find(l => l.id === item.selectedLessonId);
                  return (
                    <div
                      key={idx}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:border-emerald-300 transition-colors"
                    >
                      {/* Image Thumbnail & Original Filename */}
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={item.previewUrl}
                          alt="preview"
                          className="w-12 h-14 object-cover rounded-xl border border-slate-300 shadow-2xs shrink-0 bg-white"
                        />
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 truncate" title={item.file.name}>
                            {item.file.name}
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            {(item.file.size / 1024).toFixed(0)} KB · {item.file.type.split('/')[1]?.toUpperCase()}
                          </p>
                        </div>
                      </div>

                      {/* Lesson Dropdown Selector */}
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-slate-500 hidden sm:inline">Gán vào bài:</span>
                        <select
                          value={item.selectedLessonId}
                          onChange={(e) => handleLessonChange(idx, e.target.value)}
                          className="px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-emerald-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer shadow-2xs max-w-xs sm:max-w-sm"
                        >
                          {ALL_36_INFOGRAPHICS.map(l => (
                            <option key={l.id} value={l.id}>
                              {l.baiCode}: {l.title.replace(/^Bài \d+:\s*/, '').slice(0, 35)} ({l.chapterRoman})
                            </option>
                          ))}
                        </select>

                        <button
                          type="button"
                          onClick={() => handleRemoveItem(idx)}
                          className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Bỏ tệp này"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Progress Bar */}
          {isUploading && (
            <div className="space-y-1.5 p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="flex justify-between text-xs text-slate-700 font-semibold">
                <span>Đang lưu trữ ảnh của cô vào máy chủ...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Result Alert */}
          {resultMsg && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2.5 shadow-2xs">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{resultMsg}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <span className="text-xs text-slate-500">
            {items.length > 0 ? `Đã sẵn sàng tải lên ${items.length} ảnh` : 'Chưa có ảnh nào được chọn'}
          </span>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-600 hover:text-slate-800 text-xs font-semibold cursor-pointer"
            >
              Đóng
            </button>
            <button
              type="button"
              onClick={handleUploadAll}
              disabled={items.length === 0 || isUploading}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs sm:text-sm font-bold shadow-md transition-colors flex items-center gap-2 cursor-pointer"
            >
              {isUploading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Đang tải lên...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Lưu {items.length > 0 ? `${items.length} ảnh của cô` : 'ảnh'} vào hệ thống</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
