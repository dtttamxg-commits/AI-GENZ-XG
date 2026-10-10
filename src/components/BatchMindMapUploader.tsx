import { apiFetch } from '../services/request';
import React, { useState, useRef } from 'react';
import {
  X, UploadCloud, CheckCircle2, AlertCircle, RefreshCw,
  FolderUp, Image as ImageIcon, Trash2, Check, ArrowRight, Network
} from 'lucide-react';
import { STANDARD_MINDMAPS, MindMapItem } from '../data/mindmapsData';

interface BatchMindMapUploaderProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadCompleted: (updatedFilenames: string[]) => void;
  existingFiles: Set<string>;
}

interface SelectedMindMapUploadItem {
  file: File;
  previewUrl: string;
  selectedMindmapId: string;
}

// Smart matcher to detect which lesson/mindmap an uploaded file belongs to
function guessMindmapFromFile(fileName: string): MindMapItem | undefined {
  const clean = fileName.toLowerCase().replace(/[-_.]/g, ' ');

  // 1. Exact filename or base name match
  const exact = STANDARD_MINDMAPS.find(m =>
    m.filename.toLowerCase() === fileName.toLowerCase() ||
    m.filename.toLowerCase().replace(/\.[^/.]+$/, '') === fileName.toLowerCase().replace(/\.[^/.]+$/, '')
  );
  if (exact) return exact;

  // 2. Check for review lessons (e.g. "on tap chuong 1", "ontap c1")
  for (let ch = 1; ch <= 9; ch++) {
    const romanNums = ['', 'i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix'];
    const roman = romanNums[ch];
    const reviewPatterns = [
      new RegExp(`\\b(on tap|ôn tập|ontap)\\s*(chuong|chương|c)?\\s*0?${ch}\\b`, 'i'),
      new RegExp(`\\b(on tap|ôn tập|ontap)\\s*(chuong|chương|c)?\\s*${roman}\\b`, 'i'),
      new RegExp(`\\bontap${ch}\\b`, 'i')
    ];
    if (reviewPatterns.some(p => p.test(clean))) {
      const match = STANDARD_MINDMAPS.find(m => m.isReview && m.chapterNumber === ch);
      if (match) return match;
    }
  }

  // 3. Match LESSON NUMBER (Bài 1 đến Bài 27)
  // Crucial: "Bai 2" MUST match Bài 2 (Tập hợp), NOT Chương 2 (Bất phương trình)!
  const baiMatch = clean.match(/\b(bai|bài|lesson|b)\s*0?(\d+)\b/i);
  if (baiMatch) {
    const lessonNum = parseInt(baiMatch[2], 10);
    if (lessonNum >= 1 && lessonNum <= 27) {
      const match = STANDARD_MINDMAPS.find(m => m.lessonNumber === lessonNum);
      if (match) return match;
    }
  }

  // 4. Match pure lesson numbers at start or end (e.g. "02_Tap-hop.png" -> lesson 2)
  const numStartMatch = clean.match(/^0?(\d+)\b/);
  if (numStartMatch) {
    const num = parseInt(numStartMatch[1], 10);
    if (num >= 1 && num <= 27) {
      const match = STANDARD_MINDMAPS.find(m => m.lessonNumber === num);
      if (match) return match;
    }
  }

  // 5. Match CHAPTER NUMBER (only if explicitly says "chuong" / "chương")
  for (let ch = 1; ch <= 9; ch++) {
    const romanNums = ['', 'i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix'];
    const roman = romanNums[ch];
    const chPatterns = [
      new RegExp(`\\b(chuong|chương|chapter)\\s*0?${ch}\\b`, 'i'),
      new RegExp(`\\b(chuong|chương)\\s*${roman}\\b`, 'i')
    ];
    if (chPatterns.some(p => p.test(clean))) {
      // Find the first lesson or main item of this chapter
      const match = STANDARD_MINDMAPS.find(m => m.chapterNumber === ch);
      if (match) return match;
    }
  }

  // 6. Topic keywords match (ordered from specific to general)
  if (clean.includes('menh de') || clean.includes('mệnh đề')) {
    return STANDARD_MINDMAPS.find(m => m.lessonNumber === 1);
  }
  if (clean.includes('tap hop') || clean.includes('tập hợp')) {
    return STANDARD_MINDMAPS.find(m => m.lessonNumber === 2);
  }
  if (clean.includes('he bat phuong trinh') || clean.includes('hệ bất phương trình') || clean.includes('he bpt')) {
    return STANDARD_MINDMAPS.find(m => m.lessonNumber === 4);
  }
  if (clean.includes('bpt') || clean.includes('bất phương trình') || clean.includes('mien nghiem') || clean.includes('miền nghiệm')) {
    return STANDARD_MINDMAPS.find(m => m.lessonNumber === 3);
  }
  if (clean.includes('gtlg') || clean.includes('gia tri luong giac') || clean.includes('giá trị lượng giác')) {
    return STANDARD_MINDMAPS.find(m => m.lessonNumber === 5);
  }
  if (clean.includes('he thuc luong') || clean.includes('hệ thức lượng') || clean.includes('tam giac') || clean.includes('tam giác')) {
    return STANDARD_MINDMAPS.find(m => m.lessonNumber === 6);
  }
  if (clean.includes('khai niem mo dau') || clean.includes('mo dau vecto')) {
    return STANDARD_MINDMAPS.find(m => m.lessonNumber === 7);
  }
  if (clean.includes('tong va hieu') || clean.includes('tổng và hiệu')) {
    return STANDARD_MINDMAPS.find(m => m.lessonNumber === 8);
  }
  if (clean.includes('tich voi mot so') || clean.includes('tích với một số')) {
    return STANDARD_MINDMAPS.find(m => m.lessonNumber === 9);
  }
  if (clean.includes('toa do vecto') || clean.includes('tọa độ vecto')) {
    return STANDARD_MINDMAPS.find(m => m.lessonNumber === 10);
  }
  if (clean.includes('tich vo huong') || clean.includes('tích vô hướng')) {
    return STANDARD_MINDMAPS.find(m => m.lessonNumber === 11);
  }
  if (clean.includes('vecto') || clean.includes('vectơ')) {
    return STANDARD_MINDMAPS.find(m => m.chapterNumber === 4);
  }
  if (clean.includes('sai so') || clean.includes('sai số') || clean.includes('so gan dung')) {
    return STANDARD_MINDMAPS.find(m => m.lessonNumber === 12);
  }
  if (clean.includes('xu the trung tam') || clean.includes('trung vi') || clean.includes('trung vị')) {
    return STANDARD_MINDMAPS.find(m => m.lessonNumber === 13);
  }
  if (clean.includes('do phan tan') || clean.includes('tu phan vi') || clean.includes('tứ phân vị')) {
    return STANDARD_MINDMAPS.find(m => m.lessonNumber === 14);
  }
  if (clean.includes('thong ke') || clean.includes('thống kê')) {
    return STANDARD_MINDMAPS.find(m => m.chapterNumber === 5);
  }
  if (clean.includes('ham so bac hai') || clean.includes('hàm số bậc hai') || clean.includes('parabol')) {
    return STANDARD_MINDMAPS.find(m => m.lessonNumber === 16);
  }
  if (clean.includes('tam thuc') || clean.includes('tam thức')) {
    return STANDARD_MINDMAPS.find(m => m.lessonNumber === 17);
  }
  if (clean.includes('quy ve bac hai') || clean.includes('quy về bậc hai')) {
    return STANDARD_MINDMAPS.find(m => m.lessonNumber === 18);
  }
  if (clean.includes('ham so') || clean.includes('hàm số')) {
    return STANDARD_MINDMAPS.find(m => m.lessonNumber === 15);
  }
  if (clean.includes('duong thang') || clean.includes('đường thẳng')) {
    return STANDARD_MINDMAPS.find(m => m.lessonNumber === 19);
  }
  if (clean.includes('vi tri tuong doi') || clean.includes('khoang cach') || clean.includes('khoảng cách')) {
    return STANDARD_MINDMAPS.find(m => m.lessonNumber === 20);
  }
  if (clean.includes('duong tron') || clean.includes('đường tròn')) {
    return STANDARD_MINDMAPS.find(m => m.lessonNumber === 21);
  }
  if (clean.includes('conic') || clean.includes('elip') || clean.includes('hypebol')) {
    return STANDARD_MINDMAPS.find(m => m.lessonNumber === 22);
  }
  if (clean.includes('toa do') || clean.includes('tọa độ')) {
    return STANDARD_MINDMAPS.find(m => m.chapterNumber === 7);
  }
  if (clean.includes('quy tac dem') || clean.includes('quy tắc đếm')) {
    return STANDARD_MINDMAPS.find(m => m.lessonNumber === 23);
  }
  if (clean.includes('hoan vi') || clean.includes('chinh hop') || clean.includes('to hop') || clean.includes('tổ hợp')) {
    return STANDARD_MINDMAPS.find(m => m.lessonNumber === 24);
  }
  if (clean.includes('newton') || clean.includes('nhi thuc') || clean.includes('nhị thức')) {
    return STANDARD_MINDMAPS.find(m => m.lessonNumber === 25);
  }
  if (clean.includes('bien co') || clean.includes('biến cố') || clean.includes('khong gian mau')) {
    return STANDARD_MINDMAPS.find(m => m.lessonNumber === 26);
  }
  if (clean.includes('thuc hanh tinh xac suat') || clean.includes('thực hành tính xác suất')) {
    return STANDARD_MINDMAPS.find(m => m.lessonNumber === 27);
  }
  if (clean.includes('xac suat') || clean.includes('xác suất')) {
    return STANDARD_MINDMAPS.find(m => m.chapterNumber === 9);
  }

  return undefined;
}

export const BatchMindMapUploader: React.FC<BatchMindMapUploaderProps> = ({
  isOpen,
  onClose,
  onUploadCompleted,
  existingFiles
}) => {
  const [selectedItems, setSelectedItems] = useState<SelectedMindMapUploadItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ current: number; total: number } | null>(null);
  const [uploadResult, setUploadResult] = useState<{ success: boolean; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFilesChosen = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newItems: SelectedMindMapUploadItem[] = [];
    const imageFiles = Array.from(files).filter(f => f.type.startsWith('image/'));

    if (imageFiles.length === 0) {
      alert('Vui lòng chọn các tệp hình ảnh (.png, .jpg, .jpeg, .webp).');
      return;
    }

    imageFiles.forEach(file => {
      const guessed = guessMindmapFromFile(file.name);
      newItems.push({
        file,
        previewUrl: URL.createObjectURL(file),
        selectedMindmapId: guessed ? guessed.id : STANDARD_MINDMAPS[0].id
      });
    });

    setSelectedItems(prev => [...prev, ...newItems]);
    setUploadResult(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFilesChosen(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleRemoveItem = (index: number) => {
    setSelectedItems(prev => {
      const item = prev[index];
      if (item) URL.revokeObjectURL(item.previewUrl);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSelectMindmap = (index: number, mindmapId: string) => {
    setSelectedItems(prev =>
      prev.map((item, i) => (i === index ? { ...item, selectedMindmapId: mindmapId } : item))
    );
  };

  const handleUploadAll = async () => {
    if (selectedItems.length === 0) return;

    setIsUploading(true);
    setUploadProgress({ current: 0, total: selectedItems.length });
    setUploadResult(null);

    const uploadedFilenames: string[] = [];

    try {
      const payloadFiles: Array<{ filename: string; base64Data: string; mindmapId: string }> = [];

      for (let i = 0; i < selectedItems.length; i++) {
        const item = selectedItems[i];
        const targetMindmap = STANDARD_MINDMAPS.find(m => m.id === item.selectedMindmapId);
        const ext = (item.file.name.match(/\.(png|jpe?g|webp)$/i)?.[0] || '.png').toLowerCase();
        const baseName = targetMindmap
          ? targetMindmap.filename.replace(/\.[^/.]+$/, '')
          : item.file.name.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9.-]/g, '_');
        const filename = `${baseName}${ext}`;

        const base64Data = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(item.file);
        });

        payloadFiles.push({
          filename,
          mindmapId: item.selectedMindmapId,
          base64Data
        });
        uploadedFilenames.push(filename);
        if (targetMindmap) {
          uploadedFilenames.push(targetMindmap.filename);
          uploadedFilenames.push(baseName);
        }
      }

      let res: Response | undefined;
      for (const file of payloadFiles) {
        res = await apiFetch('/api/batch-upload-mindmaps', {
          method:'POST', headers:{'Content-Type':'application/json'},
          body:JSON.stringify({files:[file]})
        });
        if (!res.ok) throw new Error((await res.json()).error || 'Tải ảnh thất bại.');
      }

      if (res?.ok) {
        setUploadResult({
          success: true,
          message: `🎉 Đã tải lên thành công ${payloadFiles.length} ảnh sơ đồ tư duy của cô! Hệ thống đã cập nhật theo từng chương.`
        });
        onUploadCompleted(uploadedFilenames);
        setSelectedItems([]);
      } else {
        setUploadResult({
          success: false,
          message: 'Lỗi khi tải ảnh lên máy chủ. Vui lòng thử lại.'
        });
      }
    } catch (err) {
      console.error(err);
      setUploadResult({
        success: false,
        message: 'Lỗi kết nối khi gửi ảnh lên máy chủ.'
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-amber-50/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-100 text-amber-700 rounded-2xl">
              <FolderUp className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Đồng Bộ Hàng Loạt Ảnh Sơ Đồ Tư Duy
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Cô có thể kéo thả hoặc chọn nhiều ảnh sơ đồ từ máy tính cùng lúc để hệ thống tự động nhận diện và gán vào từng chương.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dropzone & Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Dropzone */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-amber-300 hover:border-amber-500 bg-amber-50/30 hover:bg-amber-50/60 rounded-3xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center group"
          >
            <input
              type="file"
              ref={fileInputRef}
              multiple
              accept="image/png,image/jpeg,image/jpg,image/webp"
              onChange={(e) => handleFilesChosen(e.target.files)}
              className="hidden"
            />
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform mb-3 shadow-xs">
              <UploadCloud className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Nhấn để chọn ảnh hoặc Kéo thả nhiều ảnh vào đây
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md">
              Hỗ trợ PNG, JPG, JPEG, WEBP. Hệ thống tự động nhận diện tên tệp theo chương (ví dụ: <code className="bg-amber-100 text-amber-800 px-1 py-0.5 rounded">Chuong1.png</code>, <code className="bg-amber-100 text-amber-800 px-1 py-0.5 rounded">Vecto.png</code>).
            </p>
          </div>

          {/* Feedback message */}
          {uploadResult && (
            <div
              className={`p-4 rounded-2xl flex items-center gap-3 text-sm font-semibold ${
                uploadResult.success
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}
            >
              {uploadResult.success ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
              )}
              <span>{uploadResult.message}</span>
            </div>
          )}

          {/* Selected Files List */}
          {selectedItems.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 px-1">
                <span>Đã chọn {selectedItems.length} ảnh cần tải lên:</span>
                <button
                  onClick={() => setSelectedItems([])}
                  className="text-rose-600 hover:text-rose-700 text-xs font-semibold"
                >
                  Xóa tất cả
                </button>
              </div>

              <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                {selectedItems.map((item, index) => {
                  const targetMindmap = STANDARD_MINDMAPS.find(m => m.id === item.selectedMindmapId);
                  const isAlreadyOnDisk = targetMindmap && existingFiles.has(targetMindmap.filename.toLowerCase());

                  return (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/80 hover:border-amber-300 transition-colors"
                    >
                      <img
                        src={item.previewUrl}
                        alt="Preview"
                        className="w-14 h-14 object-cover rounded-xl border border-slate-200 flex-shrink-0 bg-white"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900 truncate">
                            {item.file.name}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            ({(item.file.size / 1024).toFixed(0)} KB)
                          </span>
                          {isAlreadyOnDisk && (
                            <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-md font-semibold">
                              Sẽ ghi đè ảnh cũ
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 mt-1.5">
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                          <select
                            value={item.selectedMindmapId}
                            onChange={(e) => handleSelectMindmap(index, e.target.value)}
                            className="text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800 font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 truncate max-w-md cursor-pointer"
                          >
                            {STANDARD_MINDMAPS.map((m) => (
                              <option key={m.id} value={m.id}>
                                {m.chapterRoman}: {m.title} ({m.filename})
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <button
                        onClick={() => handleRemoveItem(index)}
                        className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors"
                        title="Bỏ tệp này"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            {selectedItems.length > 0
              ? `Sẵn sàng tải lên ${selectedItems.length} sơ đồ tư duy`
              : 'Chưa có ảnh nào được chọn'}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 hover:text-slate-800 text-xs font-semibold hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              Hủy bỏ
            </button>
            <button
              onClick={handleUploadAll}
              disabled={selectedItems.length === 0 || isUploading}
              className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isUploading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Đang tải lên ({uploadProgress?.current}/{uploadProgress?.total})...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Tải lên và đồng bộ ngay ({selectedItems.length})</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
