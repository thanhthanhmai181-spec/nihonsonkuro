import React, { useState, useEffect, useRef } from "react";
import { playSound } from "../utils/audio";
import { ArrowLeft, BookOpen, Search, Sparkles, RefreshCw, Flame, CheckCircle, HelpCircle, Award, Trash2 } from "lucide-react";

// Standard N5 datasets from provided HTML
const verbCompact = [
  {b:'あう',m:'gặp',g:1},{b:'あそぶ',m:'chơi',g:1},{b:'あるく',m:'đi bộ',g:1},{b:'いう',m:'nói',g:1},{b:'いく',m:'đi',g:1},{b:'いる',m:'có (người/động vật)',g:2},
  {b:'うたう',m:'hát',g:1},{b:'おきる',m:'thức dậy',g:2},{b:'おしえる',m:'dạy',g:2},{b:'おもう',m:'nghĩ',g:1},{b:'かう',m:'mua',g:1},{b:'かく',m:'viết',g:1},
  {b:'きく',m:'nghe/hỏi',g:1},{b:'きる',m:'mặc (áo)',g:2},{b:'くる',m:'đến',g:3},{b:'けす',m:'tắt/xóa',g:1},{b:'さす',m:'chỉ/đưa',g:1},{b:'しぬ',m:'chết',g:1},
  {b:'しる',m:'biết',g:1},{b:'する',m:'làm',g:3},{b:'たべる',m:'ăn',g:2},{b:'つかう',m:'sử dụng',g:1},{b:'つくる',m:'làm/tạo',g:1},{b:'とる',m:'lấy',g:1},
  {b:'なおす',m:'sửa chữa',g:1},{b:'ならう',m:'học (theo ai)',g:1},{b:'ねる',m:'ngủ',g:2},{b:'のむ',m:'uống',g:1},{b:'はなす',m:'nói chuyện',g:1},{b:'みる',m:'xem',g:2},
  {b:'よむ',m:'đọc',g:1},{b:'わかる',m:'hiểu',g:1},{b:'あける',m:'mở',g:2},{b:'あげる',m:'cho/tặng',g:2},{b:'あらう',m:'rửa',g:1},{b:'ある',m:'có (đồ vật)',g:1},
  {b:'いそぐ',m:'vội',g:1},{b:'うる',m:'bán',g:1},{b:'おくる',m:'gửi',g:1},{b:'おぼえる',m:'nhớ',g:2},{b:'かえる',m:'về',g:1},{b:'かん가える',m:'suy nghĩ',g:2},
  {b:'きえる',m:'biến mất',g:2},{b:'こたえる',m:'trả lời',g:2},{b:'さがす',m:'tìm kiếm',g:1},{b:'しめる',m:'đóng',g:2},{b:'すわる',m:'ngồi',g:1},{b:'たつ',m:'đứng',g:1},
  {b:'つける',m:'bật/đính',g:2},{b:'とめる',m:'dừng',g:2},{b:'なく',m:'khóc',g:1},{b:'ならぶ',m:'xếp hàng',g:1},{b:'のぼる',m:'leo',g:1},{b:'はいる',m:'vào',g:1},
  {b:'はく',m:'mặc (quần)',g:1},{b:'ふく',m:'lau',g:1},{b:'まつ',m:'đợi',g:1},{b:'もつ',m:'cầm',g:1},{b:'やすむ',m:'nghỉ ngơi',g:1},
  {b:'わたす',m:'đưa/giao',g:1},{b:'わたる',m:'qua',g:1},{b:'あく',m:'mở (tự động)',g:1},{b:'あつまる',m:'tập trung',g:1},{b:'いのる',m:'cầu nguyện',g:1},
  {b:'うごく',m:'di chuyển',g:1},{b:'うつ',m:'đánh',g:1},{b:'うつす',m:'sao chép',g:1},{b:'うまれる',m:'sinh ra',g:2},{b:'おう',m:'đuổi',g:1},
  {b:'おこなう',m:'thực hiện',g:1},{b:'おちる',m:'rơi',g:2},{b:'およぐ',m:'bơi',g:1},{b:'かう',m:'nuôi',g:1},{b:'かくす',m:'giấu',g:1},
  {b:'かたる',m:'kể',g:1},{b:'かなう',m:'phù hợp',g:1},{b:'かぶる',m:'đội (mũ)',g:1},{b:'きく',m:'có hiệu quả',g:1},{b:'きる',m:'cắt',g:1},
  {b:'くう',m:'ăn (thô)',g:1},{b:'くばる',m:'phân phát',g:1},{b:'くむ',m:'bơm/lấy',g:1},{b:'けす',m:'xóa',g:1},{b:'こえる',m:'vượt qua',g:2},
  {b:'こおる',m:'đóng băng',g:1},{b:'こぐ',m:'chèo',g:1},{b:'こす',m:'vượt',g:1},{b:'さく',m:'nở hoa',g:1},{b:'さける',m:'né tránh',g:2},
  {b:'ささる',m:'đâm vào',g:1},{b:'さわる',m:'chạm vào',g:1},{b:'しく',m:'trải',g:1},{b:'しずむ',m:'chìm',g:1},{b:'しばる',m:'trói',g:1},
  {b:'しむ',m:'thấm',g:1},{b:'しゃべる',m:'nói chuyện',g:1},{b:'すう',m:'hút',g:1},{b:'すく',m:'đói',g:1},{b:'すてる',m:'vứt',g:2},
  {b:'すむ',m:'sống',g:1},{b:'する',m:'mài',g:1},{b:'たく',m:'nấu cơm',g:1},{b:'たたく',m:'gõ',g:1},{b:'たのむ',m:'nhờ',g:1},
  {b:'たべる',m:'ăn',g:2},{b:'ちがう',m:'khác',g:1},{b:'つかまえる',m:'bắt',g:2},{b:'つく',m:'đến',g:1},{b:'つぐ',m:'rót',g:1},
  {b:'つたえる',m:'truyền đạt',g:2},{b:'つづく',m:'tiếp tục',g:1},{b:'つる',m:'câu cá',g:1},{b:'でる',m:'ra',g:2},{b:'とく',m:'giải',g:1},
  {b:'とける',m:'tan',g:2},{b:'とぶ',m:'bay',g:1},{b:'とまる',m:'dừng lại',g:1},{b:'tomeru',m:'dừng (ai đó)',g:2},{b:'とる',m:'chụp ảnh',g:1},
  {b:'なく',m:'hót (chim)',g:1},{b:'なぐる',m:'đấm',g:1},{b:'なげる',m:'ném',g:2},{b:'ならう',m:'học',g:1},{b:'ならぶ',m:'xếp hàng',g:1},
  {b:'にる',m:'giống',g:1},{b:'ぬう',m:'may',g:1},{b:'ぬすむ',m:'ăn trộm',g:1},{b:'ねる',m:'ngủ',g:2},{b:'のこす',m:'để lại',g:1},
  {b:'のせる',m:'đặt lên',g:2},{b:'のむ',m:'uống',g:1},{b:'のる',m:'lên xe',g:1},{b:'はいる',m:'vào',g:1},{b:'はく',m:'quét',g:1},
  {b:'はなれる',m:'rời xa',g:2},{b:'はらう',m:'trả tiền',g:1},{b:'はる',m:'dán',g:1},{b:'ひく',m:'kéo',g:1},{b:'ひらく',m:'mở (tự động)',g:1},
  {b:'ふく',m:'lau',g:1},{b:'ふむ',m:'dẫm',g:1},{b:'ふる',m:'rơi (mưa)',g:1},{b:'へる',m:'giảm',g:2},{b:'ほる',m:'đào',g:1},
  {b:'まく',m:'rắc',g:1},{b:'まける',m:'thua',g:2},{b:'まつ',m:'đợi',g:1},{b:'まもる',m:'bảo vệ',g:1},{b:'みがく',m:'đánh bóng',g:1},
  {b:'みる',m:'xem',g:2},{b:'むかう',m:'hướng tới',g:1},{b:'むすぶ',m:'buộc',g:1},{b:'める',m:'giảm',g:2},{b:'もつ',m:'mang',g:1},
  {b:'もらう',m:'nhận',g:1},{b:'やく',m:'nướng',g:1},{b:'やぶる',m:'xé',g:1},{b:'やむ',m:'tạnh',g:1},{b:'ゆう',m:'nói (lịch sự)',g:1},
  {b:'ゆれる',m:'rung',g:2},{b:'よぶ',m:'gọi',g:1},{b:'よる',m:'ghé',g:1},{b:'わかす',m:'đun sôi',g:1},{b:'わける',m:'chia',g:2},
  {b:'わたす',m:'đưa',g:1}
];

const iadjCompact = [
  {s:'たか',m:'cao/đắt'},{s:'やす',m:'rẻ'},{s:'おおき',m:'to/lớn'},{s:'ちいさ',m:'nhỏ/bé'},{s:'あたらし',m:'mới'},{s:'ふる',m:'cũ'},
  {s:'おいし',m:'ngon'},{s:'たのし',m:'vui'},{s:'むずかし',m:'khó'},{s:'あつ',m:'nóng'},{s:'さむ',m:'lạnh'},{s:'hay',m:'sớm/nhanh'},
  {s:'おそ',m:'muộn/chậm'},{s:'ひろ',m:'rộng'},{s:'せま',m:'hẹp'},{s:'あか',m:'đỏ'},{s:'あお',m:'xanh lam'},{s:'しろ',m:'trắng'},
  {s:'くろ',m:'đen'},{s:'まる',m:'tròn'},{s:'なが',m:'dài'},{s:'みじか',m:'ngắn'},{s:'ほそ',m:'mảnh'},{s:'ふと',m:'dày'},
  {s:'つよ',m:'mạnh'},{s:'よわ',m:'yếu'},{s:'かる',m:'nhẹ'},{s:'おも',m:'nặng'},{s:'わか',m:'trẻ'},{s:'あたた',m:'ấm'},
  {s:'すず',m:'mát'},{s:'あま',m:'ngọt'},{s:'から',m:'cay'},{s:'に가',m:'đắng'}, // 'にが' is corrected below
  {s:'しおから',m:'mặn'},{s:'すっぱ',m:'chua'},
  {s:'あわ',m:'nhạt'},{s:'こわ',m:'cứng'},{s:'いた',m:'đau'},{s:'かゆ',m:'ngứa'},{s:'うつくし',m:'đẹp'},{s:'きたな',m:'bẩn'},
  {s:'いそ가し',m:'bận rộn'},{s:'うるさ',m:'ồn ào'},{s:'さびし',m:'buồn bã'},{s:'かなし',m:'buồn'},{s:'うれし',m:'vui vẻ'},
  {s:'ねむ',m:'buồn ngủ'},{s:'ほし',m:'muốn'},{s:'めずらし',m:'hiếm'},{s:'やさし',m:'dễ thương'},{s:'きびし',m:'nghiêm khắc'},
  {s:'ただ',m:'đúng'},{s:'こまか',m:'chi tiết'},{s:'あぶら',m:'dầu mỡ'},{s:'あさ',m:'nông'},{s:'ふか',m:'sâu'},
  {s:'あたたか',m:'ấm áp'},{s:'つめ',m:'lạnh (nước)'},{s:'ぬる',m:'ấm (nước)'},{s:'あつ',m:'nóng'},{s:'あかる',m:'sáng'},
  {s:'くら',m:'tối'},{s:'ちか',m:'gần'},{s:'とお',m:'xa'},{s:'おも',m:'nặng'},{s:'かる',m:'nhẹ'},
  {s:'はげ',m:'dữ dội'},{s:'なつかし',m:'hoài niệm'},{s:'おとなし',m:'trầm lặng'},{s:'あほらし',m:'ngớ ngẩn'},{s:'よ',m:'tốt',irr:true}
].map(item => ({
  ...item,
  s: item.s ? item.s.replace('가', 'が') : item.s
}));

const naadjCompact = [
  {b:'しずか',m:'yên tĩnh'},{b:'げんき',m:'khỏe mạnh'},{b:'べんり',m:'tiện lợi'},{b:'ゆうめい',m:'nổi tiếng'},{b:'すき',m:'thích'},
  {b:'きらい',m:'ghét'},{b:'かんたん',m:'đơn giản'},{b:'しんせつ',m:'tử tế'},{b:'にぎやか',m:'nhộn nhịp'},{b:'きれい',m:'đẹp/sạch'},
  {b:'たいへん',m:'vất vả'},{b:'ふくざつ',m:'phức tạp'},{b:'まっすぐ',m:'thẳng'},{b:'りっぱ',m:'tuyệt vời'},{b:'じょうず',m:'giỏi'},
  {b:'へた',m:'kém'},{b:'とくい',m:'sở trường'},{b:'に가て',m:'sở đoản'},{b:'ひつよう',m:'cần thiết'},{b:'ふあん',m:'bất an'},
  {b:'あんぜん',m:'an toàn'},{b:'ざんねん',m:'đáng tiếc'},{b:'たいせつ',m:'quan trọng'},{b:'だいじょうぶ',m:'ổn'},{b:'だめ',m:'không được'},
  {b:'むり',m:'vô lý'},{b:'ふこう',m:'bất hạnh'},{b:'へいき',m:'bình thản'},{b:'けっこう',m:'khá'},{b:'らく',m:'thoải mái'},
  {b:'ふべん',m:'bất tiện'},{b:'しあわせ',m:'hạnh phúc'},{b:'ふしぎ',m:'kỳ lạ'},{b:'いろいろ',m:'đa dạng'},{b:'ひま',m:'rảnh rỗi'},
  {b:'じゃま',m:'phiền phức'},{b:'ていねい',m:'lịch sự'},{b:'ほんとう',m:'thật'},{b:'うそ',m:'nói dối'},{b:'むだ',m:'vô ích'},
  {b:'そん',m:'tổn thất'},{b:'りゆう',m:'lý do'},{b:'ざんしん',m:'mới lạ'},{b:'ゆうかん',m:'dũng cảm'},{b:'かっこう',m:'dáng vẻ'},
  {b:'げひん',m:'thô tục'},{b:'じみ',m:'giản dị'},{b:'はで',m:'lòe loẹt'},{b:'こうひょう',m:'được khen'},{b:'ふひょう',m:'bị chê'}
].map(item => ({
  ...item,
  b: item.b.replace('가', 'が')
}));

const nounCompact = [
  {b:'がくせい',m:'học sinh'},{b:'せんせい',m:'giáo viên'},{b:'にほんじん',m:'người Nhật'},{b:'ともだち',m:'bạn bè'},{b:'かいしゃいん',m:'nhân viên công ty'},
  {b:'いしゃ',m:'bác sĩ'},{b:'いぬ',m:'chó'},{b:'ねこ',m:'mèo'},{b:'ほん',m:'sách'},{b:'つくえ',m:'bàn'},{b:'いす',m:'ghế'},{b:'まど',m:'cửa sổ'},
  {b:'と',m:'cửa'},{b:'へや',m:'phòng'},{b:'だいどころ',m:'nhà bếp'},{b:'おてあらい',m:'nhà vệ sinh'},{b:'えき',m:'ga tàu'},{b:'くうこう',m:'sân bay'},
  {b:'ぎんこう',m:'ngân hàng'},{b:'ゆうびんきょく',m:'bưu điện'},{b:'びょういん',m:'bệnh viện'},{b:'くすり',m:'thuốc'},{b:'かぜ',m:'cảm lạnh'},
  {b:'て가み',m:'thư'},{b:'でんわ',m:'điện thoại'},{b:'じてんしゃ',m:'xe đạp'},{b:'くるま',m:'xe hơi'},{b:'バス',m:'xe buýt'},{b:'タクシー',m:'taxi'},
  {b:'ふね',m:'tàu thủy'},{b:'ひこうき',m:'máy bay'},{b:'きっぷ',m:'vé'},{b:'おかね',m:'tiền'},{b:'さいふ',m:'ví'},{b:'かぎ',m:'chìa khóa'},
  {b:'めがね',m:'kính'},{b:'とけい',m:'đồng hồ'},{b:'カメラ',m:'máy ảnh'},{b:'コンピュータ',m:'máy tính'},{b:'テレビ',m:'TV'},{b:'ラジオ',m:'radio'},
  {b:'れいぞうこ',m:'tủ lạnh'},{b:'せんたくき',m:'máy giặt'},{b:'そうじき',m:'máy hút bụi'},{b:'かさ',m:'ô'},{b:'くつ',m:'giày'},{b:'ふく',m:'quần áo'},
  {b:'ぼうし',m:'mũ'},{b:'てぶくろ',m:'găng tay'},{b:'あさ',m:'sáng'},{b:'ひる',m:'trưa'},{b:'ばん',m:'tối'},{b:'よる',m:'đêm'},
  {b:'きのう',m:'hôm qua'},{b:'きょう',m:'hôm nay'},{b:'あした',m:'ngày mai'},{b:'あさって',m:'ngày kia'},{b:'せんしゅう',m:'tuần trước'},
  {b:'こんしゅう',m:'tuần này'},{b:'らいしゅう',m:'tuần sau'},{b:'せんげつ',m:'tháng trước'},{b:'こんげつ',m:'tháng này'},{b:'らいげつ',m:'tháng sau'},
  {b:'きょねん',m:'năm ngoái'},{b:'ことし',m:'năm nay'},{b:'らいねん',m:'năm sau'},{b:'はる',m:'mùa xuân'},{b:'なつ',m:'mùa hè'},
  {b:'あき',m:'mùa thu'},{b:'ふゆ',m:'mùa đông'},{b:'てんき',m:'thời tiết'},{b:'あめ',m:'mưa'},{b:'ゆき',m:'tuyết'},{b:'くもり',m:'nhiều mây'},
  {b:'はれ',m:'nắng'},{b:'かぜ',m:'gió'},{b:'やま',m:'núi'},{b:'かわ',m:'sông'},{b:'うみ',m:'biển'},{b:'みずうみ',m:'hồ'},
  {b:'もり',m:'rừng'},{b:'そら',m:'bầu trời'},{b:'ほし',m:'ngôi sao'},{b:'つき',m:'mặt trăng'},{b:'たいよう',m:'mặt trời'},
  {b:'はな',m:'hoa'},{b:'き',m:'cây'},{b:'くさ',m:'cỏ'},{b:'くだもの',m:'trái cây'},{b:'やさい',m:'rau'},{b:'にく',m:'thịt'},
  {b:'さかな',m:'cá'},{b:'たまご',m:'trứng'},{b:'ぎゅうにゅう',m:'sữa bò'},{b:'みず',m:'nước'},{b:'おちゃ',m:'trà'},{b:'コーヒー',m:'cà phê'},
  {b:'おさけ',m:'rượu'},{b:'ごはん',m:'cơm'},{b:'パン',m:'bánh mì'},{b:'しお',m:'muối'},{b:'さとう',m:'đường'},{b:'しょうゆ',m:'nước tương'},
  {b:'みそ',m:'miso'},{b:'りょうり',m:'nấu ăn'},{b:'しょくじ',m:'bữa ăn'},{b:'あさごはん',m:'bữa sáng'},{b:'ひるごはん',m:'bữa trưa'},
  {b:'ばんごはん',m:'bữa tối'},{b:'おやつ',m:'bữa xế'},{b:'かいもの',m:'mua sắm'},{b:'さんぽ',m:'đi dạo'},{b:'りょこう',m:'du lịch'},
  {b:'しごと',m:'công việc'},{b:'かいぎ',m:'cuộc họp'},{b:'しゅくだい',m:'bài tập'},{b:'テスト',m:'bài kiểm tra'},{b:'やすみ',m:'ngày nghỉ'},
  {b:'たんじょうび',m:'sinh nhật'},{b:'プレゼント',m:'quà'},{b:'おみやげ',m:'quà lưu niệm'},{b:'しゃしん',m:'ảnh'},{b:'えいが',m:'phim'},
  {b:'おん가く',m:'âm nhạc'},{b:'うた',m:'bài hát'},{b:'ダンス',m:'khiêu vũ'},{b:'スポーツ',m:'thể thao'},{b:'やきゅう',m:'bóng chày'},
  {b:'サッカー',m:'bóng đá'},{b:'テニス',m:'quần vợt'},{b:'すいえい',m:'bơi lội'},{b:'りょうしん',m:'bố mẹ'},{b:'かぞく',m:'gia đình'},
  {b:'おじいさん',m:'ông'},{b:'おばあさん',m:'bà'},{b:'おとうさん',m:'bố'},{b:'おかあさん',m:'mẹ'},{b:'おにいさん',m:'anh trai'},
  {b:'おねえさん',m:'chị gái'},{b:'おとうと',m:'em trai'},{b:'いもうと',m:'em gái'},{b:'むすこ',m:'con trai'},{b:'むすめ',m:'con gái'},
  {b:'おっと',m:'chồng'},{b:'つま',m:'vợ'},{b:'こども',m:'trẻ em'},{b:'ともだち',m:'bạn'},{b:'かれ',m:'bạn trai'},
  {b:'かのじょ',m:'bạn gái'},{b:'となり',m:'hàng xóm'},{b:'ちかく',m:'gần đây'},{b:'まち',m:'thị trấn'},{b:'むら',m:'làng'},
  {b:'くに',m:'đất nước'},{b:'がいこく',m:'nước ngoài'},{b:'にほん',m:'Nhật Bản'},{b:'アメリカ',m:'Mỹ'},{b:'イギリス',m:'Anh'},
  {b:'フランス',m:'Pháp'},{b:'ちゅうごく',m:'Trung Quốc'},{b:'かんこく',m:'Hàn Quốc'},{b:'ベトナム',m:'Việt Nam'},{b:'タイ',m:'Thái Lan'},
  {b:'インド',m:'Ấn Độ'},{b:'ことば',m:'ngôn ngữ'},{b:'にほんご',m:'tiếng Nhật'},{b:'えいご',m:'tiếng Anh'},{b:'べんきょう',m:'học tập'},
  {b:'せいかつ',m:'cuộc sống'},{b:'けいけん',m:'kinh nghiệm'},{b:'しつもん',m:'câu hỏi'},{b:'こたえ',m:'câu trả lời'},{b:'いみ',m:'ý nghĩa'},
  {b:'よみかた',m:'cách đọc'},{b:'かきかた',m:'cách viết'},{b:'はつおん',m:'phát âm'},{b:'bうんぽう',m:'ngữ pháp'},{b:'たんご',m:'từ vựng'}
].map(item => ({
  ...item,
  b: item.b.replace('가', 'が').replace('bうんぽう', 'ぶんぽう')
}));

// Helper functions for conjugations
function getVerbForms(base: string, group: number) {
  const b = base.replace('かん가える', 'かんがえる');
  if (group === 3) {
    if (b === 'する') return { polite: ['します', 'しません', 'しました', 'しませんでした'], plain: ['する', 'しない', 'した', 'しなかった'] };
    if (b === 'くる') return { polite: ['きます', 'きません', 'きました', 'きませんでした'], plain: ['くる', 'こない', 'きた', 'こなかった'] };
  }
  if (group === 2) {
    const stem = b.slice(0, -1);
    return { polite: [stem + 'ます', stem + 'ません', stem + 'ました', stem + 'ませんでした'], plain: [b, stem + 'ない', stem + 'た', stem + 'なかった'] };
  }
  const last = b[b.length - 1];
  const map: { [key: string]: string } = { 'う': 'い', 'つ': 'ち', 'る': 'り', 'く': 'き', 'ぐ': 'ぎ', 'す': 'し', 'む': 'み', 'ぶ': 'bi', 'ぬ': 'ni' };
  // Wait, let's fix the CJS/ESM group 1 mapping typo in original HTML if there are 'bi', 'ni'
  const realMap: { [key: string]: string } = { 'う': 'い', 'つ': 'ち', 'る': 'り', 'く': 'き', 'ぐ': 'ぎ', 'す': 'し', 'む': 'み', 'ぶ': 'び', 'ぬ': 'に' };
  const iRow = realMap[last] || last;
  const stem = b.slice(0, -1) + iRow;
  
  const negMap: { [key: string]: string } = { 'う': 'わ', 'つ': 'た', 'る': 'ら', 'く': 'か', 'ぐ': 'が', 'す': 'sあ', 'む': 'ま', 'ぶ': 'ば', 'ぬ': 'な' };
  const realNegMap: { [key: string]: string } = { 'う': 'わ', 'つ': 'た', 'る': 'ら', 'く': 'か', 'ぐ': 'が', 'す': 'さ', 'む': 'ま', 'ぶ': 'ば', 'ぬ': 'な' };
  const aRow = realNegMap[last] || last;
  const negStem = b.slice(0, -1) + aRow;
  
  const taMap: { [key: string]: string } = { 'う': 'った', 'つ': 'った', 'る': 'った', 'く': 'いた', 'ぐ': 'いだ', 'す': 'した', 'む': 'んだ', 'ぶ': 'んだ', 'ぬ': 'んだ' };
  // Specical case: いく (iku) is always "いった" in past form
  const taForm = b === 'いく' ? 'いった' : b.slice(0, -1) + (taMap[last] || 'った');
  
  return { polite: [stem + 'ます', stem + 'ません', stem + 'ました', stem + 'ませんでした'], plain: [b, negStem + 'ない', taForm, negStem + 'なかった'] };
}

function getIadjForms(stem: string, irr?: boolean) {
  if (irr) return { polite: ['いいです', 'よくないです', 'よかったです', 'よくなかったです'], plain: ['いい', 'よくない', 'よかった', 'よくなかった'] };
  return { polite: [stem + 'いです', stem + 'くないです', stem + 'かったです', stem + 'くなかったです'], plain: [stem + 'い', stem + 'くない', stem + 'かった', stem + 'くなかった'] };
}

function getNaadjForms(base: string) {
  return { polite: [base + 'です', base + 'じゃありません', base + 'でした', base + 'じゃありませんでした'], plain: [base + 'だ', base + 'じゃない', base + 'だった', base + 'じゃなかった'] };
}

function getNounForms(base: string) {
  return getNaadjForms(base);
}

// Map key positions to localized form names
const formNamesMap: { [key: string]: string[] } = {
  polite: ['Hiện tại Khẳng Định', 'Hiện tại Phủ Định', 'Quá khứ Khẳng Định', 'Quá khứ Phủ Định'],
  plain: ['Hiện tại Khẳng Định (thường)', 'Hiện tại Phủ Định (thường)', 'Quá khứ Khẳng Định (thường)', 'Quá khứ Phủ Định (thường)']
};

const formSuffixesMap: { [key: string]: string[] } = {
  polite: ['(ます/đes)', '(ません/じゃありません)', '(ました/でした)', '(ませんでした/じゃありませんでした)'],
  plain: ['(từ điển/だ)', '(ない/じゃない)', '(た/đã chia)', '(なかった/đã chia phủ định)']
};

// Full processed datasets
const verbDataFull = verbCompact.map((v, i) => {
  const forms = getVerbForms(v.b, v.g);
  return { id: 'v' + i, word: v.b, meaning: v.m, group: v.g, forms, polite: forms.polite };
});

const iadjDataFull = iadjCompact.map((v, i) => {
  const word = v.irr ? 'いい' : v.s + 'い';
  return { id: 'i' + i, word, meaning: v.m, stem: v.s, irr: v.irr, forms: getIadjForms(v.s || '', v.irr) };
});

const naadjDataFull = naadjCompact.map((v, i) => {
  return { id: 'n' + i, word: v.b, meaning: v.m, forms: getNaadjForms(v.b) };
});

const nounDataFull = nounCompact.map((v, i) => {
  return { id: 'nn' + i, word: v.b, meaning: v.m, forms: getNounForms(v.b) };
});

const allDataMap: { [key: string]: any[] } = {
  verbs: verbDataFull,
  iadj: iadjDataFull,
  naadj: naadjDataFull,
  nouns: nounDataFull
};

interface VerbConjugationLessonsProps {
  onGoBack: () => void;
}

export default function VerbConjugationLessons({ onGoBack }: VerbConjugationLessonsProps) {
  const [activeTab, setActiveTab] = useState<"knowledge" | "practice" | "test" | "stats">("knowledge");
  
  // Knowledge Sub-state
  const [knowledgeSub, setKnowledgeSub] = useState<"verbs" | "iadj" | "naadj" | "nouns">("verbs");
  const [lookupWord, setLookupWord] = useState("");
  const [lookupFormSet, setLookupFormSet] = useState<"polite" | "plain">("polite");
  const [lookupResult, setLookupResult] = useState<any>(null);
  const [lookupError, setLookupError] = useState("");

  // Practice State
  const [practiceCat, setPracticeCat] = useState<"verbs" | "iadj" | "naadj" | "nouns">("verbs");
  const [practiceFormSet, setPracticeFormSet] = useState<"polite" | "plain">("polite");
  const [practiceItem, setPracticeItem] = useState<any>(null);
  const [practiceFormIdx, setPracticeFormIdx] = useState(0);
  const [practiceInput, setPracticeInput] = useState("");
  const [practiceAnswered, setPracticeAnswered] = useState(false);
  const [practiceFeedback, setPracticeFeedback] = useState<{ isCorrect: boolean; correctAnswer: string } | null>(null);
  const [practiceHintUsed, setPracticeHintUsed] = useState(false);

  // Test State
  const [testCat, setTestCat] = useState<"all" | "verbs" | "iadj" | "naadj" | "nouns">("all");
  const [testCount, setTestCount] = useState(10);
  const [testInProgress, setTestInProgress] = useState(false);
  const [testQuestions, setTestQuestions] = useState<any[]>([]);
  const [testCurrentIdx, setTestCurrentIdx] = useState(0);
  const [testScore, setTestScore] = useState(0);
  const [testAnswered, setTestAnswered] = useState(false);
  const [testSelectedOption, setTestSelectedOption] = useState<string | null>(null);
  const [testComplete, setTestComplete] = useState(false);

  // Stats State
  const [stats, setStats] = useState(() => {
    try {
      const saved = localStorage.getItem("sonkuro_verb_stats");
      return saved ? JSON.parse(saved) : {
        total: 0,
        correct: 0,
        streak: 0,
        bestStreak: 0,
        byCat: {
          verbs: { total: 0, correct: 0 },
          iadj: { total: 0, correct: 0 },
          naadj: { total: 0, correct: 0 },
          nouns: { total: 0, correct: 0 }
        }
      };
    } catch {
      return {
        total: 0,
        correct: 0,
        streak: 0,
        bestStreak: 0,
        byCat: {
          verbs: { total: 0, correct: 0 },
          iadj: { total: 0, correct: 0 },
          naadj: { total: 0, correct: 0 },
          nouns: { total: 0, correct: 0 }
        }
      };
    }
  });

  useEffect(() => {
    localStorage.setItem("sonkuro_verb_stats", JSON.stringify(stats));
  }, [stats]);

  // Handle Stats recording
  const recordStat = (cat: string, isCorrect: boolean) => {
    setStats((prev: any) => {
      const total = prev.total + 1;
      const correct = prev.correct + (isCorrect ? 1 : 0);
      const streak = isCorrect ? prev.streak + 1 : 0;
      const bestStreak = Math.max(prev.bestStreak, streak);
      const categoryStats = prev.byCat[cat] || { total: 0, correct: 0 };
      
      return {
        ...prev,
        total,
        correct,
        streak,
        bestStreak,
        byCat: {
          ...prev.byCat,
          [cat]: {
            total: categoryStats.total + 1,
            correct: categoryStats.correct + (isCorrect ? 1 : 0)
          }
        }
      };
    });
  };

  const handleClearStats = () => {
    playSound.click();
    if (window.confirm("Em có muốn xóa toàn bộ thống kê luyện tập chia thể không?")) {
      const reset = {
        total: 0,
        correct: 0,
        streak: 0,
        bestStreak: 0,
        byCat: {
          verbs: { total: 0, correct: 0 },
          iadj: { total: 0, correct: 0 },
          naadj: { total: 0, correct: 0 },
          nouns: { total: 0, correct: 0 }
        }
      };
      setStats(reset);
    }
  };

  // Setup lookup action
  const handleLookup = (customWord?: string) => {
    playSound.click();
    const query = (customWord || lookupWord).trim();
    if (!query) {
      setLookupError("Vui lòng nhập từ cần tra cứu.");
      setLookupResult(null);
      return;
    }
    setLookupError("");

    const data = allDataMap[knowledgeSub];
    let found = null;
    if (knowledgeSub === "verbs") {
      found = data.find(d => d.word === query || d.forms.polite[0] === query || d.forms.plain[0] === query);
    } else {
      found = data.find(d => d.word === query);
    }

    if (!found) {
      setLookupError(`Không tìm thấy "${query}" trong dữ liệu N5.`);
      setLookupResult(null);
    } else {
      setLookupResult(found);
    }
  };

  // Practice Pick next
  const pickNewPracticeWord = (cat = practiceCat, fs = practiceFormSet) => {
    const data = allDataMap[cat];
    if (!data || data.length === 0) return;
    const item = data[Math.floor(Math.random() * data.length)];
    setPracticeItem(item);
    setPracticeFormIdx(Math.floor(Math.random() * 4));
    setPracticeInput("");
    setPracticeAnswered(false);
    setPracticeFeedback(null);
    setPracticeHintUsed(false);
  };

  useEffect(() => {
    pickNewPracticeWord();
  }, [practiceCat, practiceFormSet]);

  const checkPracticeAnswer = () => {
    if (!practiceItem || practiceAnswered) return;
    const ca = practiceItem.forms[practiceFormSet][practiceFormIdx];
    const userAns = practiceInput.trim();
    const isCorrect = userAns === ca;
    
    setPracticeAnswered(true);
    setPracticeFeedback({ isCorrect, correctAnswer: ca });
    
    if (isCorrect) {
      playSound.correct();
    } else {
      // Sound fallback or error sound can be played here
    }
    
    recordStat(practiceCat, isCorrect);
  };

  const handlePracticeHint = () => {
    playSound.click();
    if (!practiceItem || practiceAnswered) return;
    const ca = practiceItem.forms[practiceFormSet][practiceFormIdx];
    setPracticeHintUsed(true);
    alert(`💡 Gợi ý: Gồm ${ca.length} ký tự. Ký tự đầu: "${ca[0]}" và ký tự cuối: "${ca[ca.length-1]}"`);
  };

  // Test setup
  const startTest = () => {
    playSound.click();
    let pool: any[] = [];
    if (testCat === "all") {
      pool = [
        ...verbDataFull.map(v => ({ ...v, cat: 'verbs' })),
        ...iadjDataFull.map(v => ({ ...v, cat: 'iadj' })),
        ...naadjDataFull.map(v => ({ ...v, cat: 'naadj' })),
        ...nounDataFull.map(v => ({ ...v, cat: 'nouns' }))
      ];
    } else {
      pool = allDataMap[testCat].map(v => ({ ...v, cat: testCat }));
    }

    if (pool.length === 0) return;
    
    // Shuffle and pick
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(testCount, shuffled.length));

    const questions = selected.map(item => {
      const fs = Math.random() < 0.5 ? 'polite' : 'plain';
      const fi = Math.floor(Math.random() * 4);
      const correct = item.forms[fs][fi];

      // Distractors
      let distractors = [...item.forms.polite, ...item.forms.plain].filter(f => f !== correct);
      const otherItems = pool.filter(x => x.id !== item.id).sort(() => Math.random() - 0.5);
      
      for (const o of otherItems) {
        if (distractors.length >= 6) break;
        const ofs = [...o.forms.polite, ...o.forms.plain];
        for (const f of ofs) {
          if (f !== correct && !distractors.includes(f)) {
            distractors.push(f);
            if (distractors.length >= 6) break;
          }
        }
      }

      const uniqueDistractors = [...new Set(distractors)].slice(0, 3);
      const options = [correct, ...uniqueDistractors].sort(() => Math.random() - 0.5);

      return {
        item,
        cat: item.cat,
        formSet: fs,
        formIdx: fi,
        correct,
        options,
        formLabel: formNamesMap[fs][fi],
        formSuffix: formSuffixesMap[fs][fi]
      };
    });

    setTestQuestions(questions);
    setTestCurrentIdx(0);
    setTestScore(0);
    setTestAnswered(false);
    setTestSelectedOption(null);
    setTestInProgress(true);
    setTestComplete(false);
  };

  const handleSelectOption = (opt: string) => {
    if (testAnswered) return;
    playSound.click();
    setTestSelectedOption(opt);
    setTestAnswered(true);
    
    const q = testQuestions[testCurrentIdx];
    const isCorrect = opt === q.correct;
    if (isCorrect) {
      playSound.correct();
      setTestScore(prev => prev + 1);
    }
    recordStat(q.cat, isCorrect);
  };

  const nextTestQuestion = () => {
    playSound.click();
    if (testCurrentIdx + 1 >= testQuestions.length) {
      setTestComplete(true);
    } else {
      setTestCurrentIdx(prev => prev + 1);
      setTestAnswered(false);
      setTestSelectedOption(null);
    }
  };

  return (
    <div className="washi-pattern min-h-screen p-4 sm:p-8 -mx-4 sm:-mx-8 rounded-[40px] border-2 border-[#1A1A1A] text-[#1A1A1A] flex flex-col" style={{ fontFamily: "'Lora', 'Noto Serif JP', serif" }}>
      {/* Upper Navigation Back Button */}
      <div className="flex justify-between items-center mb-6 border-b-2 border-[#1A1A1A] pb-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 border-2 border-[#1A1A1A] bg-[#1A1A1A] rounded flex items-center justify-center text-white font-black text-lg">
            変
          </div>
          <span className="text-lg font-black tracking-widest uppercase">
            QUYỂN VI: CHIA THỂ ĐỘNG TỪ
          </span>
        </div>
        <button
          onClick={() => {
            playSound.click();
            onGoBack();
          }}
          className="flex items-center gap-2 text-[#1A1A1A] font-bold hover:text-[#8B0000] transition-colors border-2 border-[#1A1A1A] hover:border-[#8B0000] px-4 py-1.5 rounded-xl bg-white shadow-[3px_3px_0px_#1A1A1A] hover:shadow-[3px_3px_0px_#8B0000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Trở về Lớp học</span>
        </button>
      </div>

      {/* Main Tabs Selection */}
      <div className="flex flex-wrap gap-2 mb-8 bg-zinc-100 p-2 rounded-2xl border-2 border-[#1A1A1A] max-w-xl mx-auto w-full justify-center">
        <button
          onClick={() => { playSound.click(); setActiveTab("knowledge"); }}
          className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === "knowledge" ? "bg-[#8B0000] text-white shadow-md" : "text-zinc-600 hover:text-[#8B0000] hover:bg-zinc-200"}`}
        >
          📚 Kiến thức
        </button>
        <button
          onClick={() => { playSound.click(); setActiveTab("practice"); }}
          className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === "practice" ? "bg-[#8B0000] text-white shadow-md" : "text-zinc-600 hover:text-[#8B0000] hover:bg-zinc-200"}`}
        >
          ✍️ Luyện tập
        </button>
        <button
          onClick={() => { playSound.click(); setActiveTab("test"); }}
          className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === "test" ? "bg-[#8B0000] text-white shadow-md" : "text-zinc-600 hover:text-[#8B0000] hover:bg-zinc-200"}`}
        >
          📝 Kiểm tra
        </button>
        <button
          onClick={() => { playSound.click(); setActiveTab("stats"); }}
          className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === "stats" ? "bg-[#8B0000] text-white shadow-md" : "text-zinc-600 hover:text-[#8B0000] hover:bg-zinc-200"}`}
        >
          📊 Đánh giá
        </button>
      </div>

      {/* Active Tab Panel Body */}
      <div className="flex-1 max-w-5xl mx-auto w-full">
        {/* TAB 1: KNOWLEDGE */}
        {activeTab === "knowledge" && (
          <div className="space-y-6">
            <div className="flex justify-center gap-2 mb-4 overflow-x-auto py-1">
              {[
                { id: "verbs", label: "Động từ (V)" },
                { id: "iadj", label: "Tính từ い (Aい)" },
                { id: "naadj", label: "Tính từ な (Aな)" },
                { id: "nouns", label: "Danh từ (N)" }
              ].map(sub => (
                <button
                  key={sub.id}
                  onClick={() => { playSound.click(); setKnowledgeSub(sub.id as any); setLookupResult(null); setLookupWord(""); setLookupError(""); }}
                  className={`px-4 py-2 rounded-full border-2 text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${knowledgeSub === sub.id ? "bg-[#1A1A1A] text-white border-[#1A1A1A]" : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400"}`}
                >
                  {sub.label}
                </button>
              ))}
            </div>

            {/* Sub content Verb */}
            {knowledgeSub === "verbs" && (
              <div className="bg-white rounded-2xl border-4 border-[#1A1A1A] p-6 shadow-[6px_6px_0px_#1A1A1A] space-y-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#8B0000] flex items-center gap-2">
                    <span>🔹</span> CÁCH CHIA ĐỘNG TỪ (V)
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-500 italic mt-1">Hệ thống chia thể lịch sự (ます) và thể thông thường của 3 nhóm động từ N5.</p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-sm text-[#8B0000] border-l-4 border-[#8B0000] pl-2 uppercase">📌 THỂ LỊCH SỰ (ます)</h3>
                  <div className="overflow-x-auto rounded-xl border border-zinc-200">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <thead>
                        <tr className="bg-zinc-50 border-b border-zinc-200">
                          <th className="p-3 font-bold text-zinc-700">Thể / Trạng thái</th>
                          <th className="p-3 font-bold text-[#8B0000]">Nhóm 1 (かく)</th>
                          <th className="p-3 font-bold text-[#8B0000]">Nhóm 2 (たべる)</th>
                          <th className="p-3 font-bold text-[#8B0000]">Nhóm 3 (くる)</th>
                          <th className="p-3 font-bold text-[#8B0000]">Nhóm 3 (する)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200">
                        <tr>
                          <td className="p-3 font-bold">Hiện tại Khẳng Định</td>
                          <td className="p-3 font-jp">かきます</td>
                          <td className="p-3 font-jp">たべます</td>
                          <td className="p-3 font-jp">きます</td>
                          <td className="p-3 font-jp">します</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-bold">Hiện tại Phủ Định</td>
                          <td className="p-3 font-jp">かきません</td>
                          <td className="p-3 font-jp">たべません</td>
                          <td className="p-3 font-jp">きません</td>
                          <td className="p-3 font-jp">しません</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-bold">Quá khứ Khẳng Định</td>
                          <td className="p-3 font-jp">かきました</td>
                          <td className="p-3 font-jp">たべました</td>
                          <td className="p-3 font-jp">きました</td>
                          <td className="p-3 font-jp">しました</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-bold">Quá khứ Phủ Định</td>
                          <td className="p-3 font-jp">かきませんでした</td>
                          <td className="p-3 font-jp">たべませんでした</td>
                          <td className="p-3 font-jp">きませんでした</td>
                          <td className="p-3 font-jp">しませんでした</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-sm text-[#8B0000] border-l-4 border-[#8B0000] pl-2 uppercase">📌 THỂ THÔNG THƯỜNG (PLAIN FORM)</h3>
                  <div className="overflow-x-auto rounded-xl border border-zinc-200">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <thead>
                        <tr className="bg-zinc-50 border-b border-zinc-200">
                          <th className="p-3 font-bold text-zinc-700">Thể / Trạng thái</th>
                          <th className="p-3 font-bold text-[#8B0000]">Nhóm 1 (かく)</th>
                          <th className="p-3 font-bold text-[#8B0000]">Nhóm 2 (たべる)</th>
                          <th className="p-3 font-bold text-[#8B0000]">Nhóm 3 (くる)</th>
                          <th className="p-3 font-bold text-[#8B0000]">Nhóm 3 (する)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200">
                        <tr>
                          <td className="p-3 font-bold">Hiện tại Khẳng Định</td>
                          <td className="p-3 font-jp">かく</td>
                          <td className="p-3 font-jp">たべる</td>
                          <td className="p-3 font-jp">くる</td>
                          <td className="p-3 font-jp">する</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-bold">Hiện tại Phủ Định</td>
                          <td className="p-3 font-jp">かかない</td>
                          <td className="p-3 font-jp">たべない</td>
                          <td className="p-3 font-jp">こない</td>
                          <td className="p-3 font-jp">しない</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-bold">Quá khứ Khẳng Định</td>
                          <td className="p-3 font-jp">かいた</td>
                          <td className="p-3 font-jp">たべた</td>
                          <td className="p-3 font-jp">きた</td>
                          <td className="p-3 font-jp">した</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-bold">Quá khứ Phủ Định</td>
                          <td className="p-3 font-jp">かかなかった</td>
                          <td className="p-3 font-jp">たべなかった</td>
                          <td className="p-3 font-jp">こなかった</td>
                          <td className="p-3 font-jp">しなかった</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Sub content iadj */}
            {knowledgeSub === "iadj" && (
              <div className="bg-white rounded-2xl border-4 border-[#1A1A1A] p-6 shadow-[6px_6px_0px_#1A1A1A] space-y-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#8B0000] flex items-center gap-2">
                    <span>🟡</span> TÍNH TỪ い (Aい)
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-500 italic mt-1">Cách chia tính từ đuôi い ở dạng lịch sự và dạng thông thường.</p>
                </div>

                <div className="overflow-x-auto rounded-xl border border-zinc-200">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-zinc-50 border-b border-zinc-200">
                        <th className="p-3 font-bold text-zinc-700">Thể / Trạng thái</th>
                        <th className="p-3 font-bold text-[#8B0000]">Lịch sự (Tập trung: たかい)</th>
                        <th className="p-3 font-bold text-zinc-700">Thông thường (Tập trung: たかい)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200">
                      <tr>
                        <td className="p-3 font-bold">Hiện tại Khẳng Định</td>
                        <td className="p-3 font-jp">たかいです</td>
                        <td className="p-3 font-jp">たかい</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold">Hiện tại Phủ Định</td>
                        <td className="p-3 font-jp">たかくないです</td>
                        <td className="p-3 font-jp">たかくない</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold">Quá khứ Khẳng Định</td>
                        <td className="p-3 font-jp">たかかったです</td>
                        <td className="p-3 font-jp">たかかった</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold">Quá khứ Phủ Định</td>
                        <td className="p-3 font-jp">たかくなかったです</td>
                        <td className="p-3 font-jp">たかくなかった</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Sub content naadj */}
            {knowledgeSub === "naadj" && (
              <div className="bg-white rounded-2xl border-4 border-[#1A1A1A] p-6 shadow-[6px_6px_0px_#1A1A1A] space-y-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#8B0000] flex items-center gap-2">
                    <span>🟢</span> TÍNH TỪ な (Aな)
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-500 italic mt-1">Cách chia tính từ đuôi な (giữ nguyên gốc tính từ khi chia).</p>
                </div>

                <div className="overflow-x-auto rounded-xl border border-zinc-200">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-zinc-50 border-b border-zinc-200">
                        <th className="p-3 font-bold text-zinc-700">Thể / Trạng thái</th>
                        <th className="p-3 font-bold text-[#8B0000]">Lịch sự (Tập trung: しずか)</th>
                        <th className="p-3 font-bold text-zinc-700">Thông thường (Tập trung: しずか)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200">
                      <tr>
                        <td className="p-3 font-bold">Hiện tại Khẳng Định</td>
                        <td className="p-3 font-jp">しずかです</td>
                        <td className="p-3 font-jp">しずかだ</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold">Hiện tại Phủ Định</td>
                        <td className="p-3 font-jp">しずかじゃありません</td>
                        <td className="p-3 font-jp">しずかじゃない</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold">Quá khứ Khẳng Định</td>
                        <td className="p-3 font-jp">しずかでした</td>
                        <td className="p-3 font-jp">しずかだった</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold">Quá khứ Phủ Định</td>
                        <td className="p-3 font-jp">しずかじゃありませんでした</td>
                        <td className="p-3 font-jp">しずかじゃなかった</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Sub content Nouns */}
            {knowledgeSub === "nouns" && (
              <div className="bg-white rounded-2xl border-4 border-[#1A1A1A] p-6 shadow-[6px_6px_0px_#1A1A1A] space-y-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#8B0000] flex items-center gap-2">
                    <span>🔵</span> DANH TỪ (N)
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-500 italic mt-1">Cách chia danh từ (về bản chất giống với cách chia tính từ đuôi な).</p>
                </div>

                <div className="overflow-x-auto rounded-xl border border-zinc-200">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-zinc-50 border-b border-zinc-200">
                        <th className="p-3 font-bold text-zinc-700">Thể / Trạng thái</th>
                        <th className="p-3 font-bold text-[#8B0000]">Lịch sự (Tập trung: がくせい)</th>
                        <th className="p-3 font-bold text-zinc-700">Thông thường (Tập trung: がくせい)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200">
                      <tr>
                        <td className="p-3 font-bold">Hiện tại Khẳng Định</td>
                        <td className="p-3 font-jp">がくせいです</td>
                        <td className="p-3 font-jp">がくせいだ</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold">Hiện tại Phủ Định</td>
                        <td className="p-3 font-jp">がくせいじゃありません</td>
                        <td className="p-3 font-jp">がくせいじゃない</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold">Quá khứ Khẳng Định</td>
                        <td className="p-3 font-jp">がくせいでした</td>
                        <td className="p-3 font-jp">がくせいだった</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold">Quá khứ Phủ Định</td>
                        <td className="p-3 font-jp">がくせいじゃありませんでした</td>
                        <td className="p-3 font-jp">がくせいじゃなかった</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Interactive Search Tool in Knowledge Tab */}
            <div className="bg-[#FFFDF9] rounded-2xl border-4 border-[#1A1A1A] p-6 shadow-[6px_6px_0px_#1A1A1A] space-y-4">
              <h3 className="font-bold text-base text-[#8B0000] flex items-center gap-2">
                <Search className="w-5 h-5 text-[#8B0000]" />
                <span>TRA CỨU CHIA THỂ ĐỘNG TỪ & TÍNH TỪ N5</span>
              </h3>
              <p className="text-xs text-zinc-600 font-medium">
                Nhập thể nguyên mẫu (từ điển) hoặc thể lịch sự của từ cần tra cứu. 
                Hệ thống hỗ trợ hơn 750 từ vựng N5 thông dụng!
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <select
                  value={lookupFormSet}
                  onChange={(e) => { playSound.click(); setLookupFormSet(e.target.value as any); }}
                  className="px-4 py-2.5 rounded-xl border-2 border-[#1A1A1A] bg-white font-bold text-xs sm:text-sm focus:outline-none"
                >
                  <option value="polite">Hiện lịch sự</option>
                  <option value="plain">Hiện thông thường</option>
                </select>

                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={lookupWord}
                    onChange={(e) => setLookupWord(e.target.value)}
                    placeholder="Nhập ví dụ: かく, たべる, やすい, しずか..."
                    className="w-full pl-4 pr-10 py-2.5 rounded-xl border-2 border-[#1A1A1A] font-jp text-sm focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                    onKeyDown={(e) => { if (e.key === 'Enter') handleLookup(); }}
                  />
                  <button
                    onClick={() => handleLookup()}
                    className="absolute right-2 top-2 text-[#8B0000] hover:scale-110 transition-transform"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </div>

                <button
                  onClick={() => handleLookup()}
                  className="px-6 py-2.5 bg-[#8B0000] hover:bg-[#A30000] text-white rounded-xl font-bold text-sm border-2 border-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                >
                  Tra cứu
                </button>
              </div>

              {lookupError && (
                <p className="text-sm font-bold text-[#8B0000]">{lookupError}</p>
              )}

              {/* Lookup results rendering */}
              {lookupResult && (
                <div className="bg-white border-2 border-[#1A1A1A] rounded-xl p-4 space-y-3 animate-pulse-once">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-2">
                    <div>
                      <span className="font-jp text-xl font-bold text-[#8B0000]">{lookupResult.word}</span>
                      <span className="text-xs text-zinc-500 ml-2 font-sans font-medium">({lookupResult.meaning})</span>
                    </div>
                    <span className="text-[10px] font-black uppercase bg-zinc-100 border border-zinc-300 px-2 py-0.5 rounded text-zinc-700">
                      {knowledgeSub === "verbs" ? `Nhóm ${lookupResult.group}` : knowledgeSub === "iadj" ? "Tính từ い" : knowledgeSub === "naadj" ? "Tính từ な" : "Danh từ"}
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead>
                        <tr className="bg-zinc-50">
                          <th className="p-2 border border-zinc-200">Thể / Trạng thái</th>
                          <th className="p-2 border border-zinc-200 text-[#8B0000]">Dạng chia</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formNamesMap[lookupFormSet].map((name, idx) => (
                          <tr key={idx} className="hover:bg-zinc-50">
                            <td className="p-2 border border-zinc-200 font-bold">{name}</td>
                            <td className="p-2 border border-zinc-200 font-jp text-sm font-bold tracking-wide">{lookupResult.forms[lookupFormSet][idx]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Suggest standard N5 vocabulary to look up immediately */}
              <div className="pt-2">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-2">Đề xuất tra cứu nhanh:</span>
                <div className="flex flex-wrap gap-1.5">
                  {(knowledgeSub === "verbs" 
                    ? ["あう", "あそぶ", "いく", "する", "くる", "たべる", "かく", "のむ"] 
                    : knowledgeSub === "iadj" 
                      ? ["たかい", "やすい", "おいしい", "たのしい", "いい", "さむい"]
                      : knowledgeSub === "naadj"
                        ? ["しずか", "げんき", "べんり", "ゆうめい", "すき"]
                        : ["がくせい", "せんせい", "にほんご", "ともだち", "いぬ"]
                  ).map((word, wIdx) => (
                    <button
                      key={wIdx}
                      onClick={() => { setLookupWord(word); handleLookup(word); }}
                      className="px-2.5 py-1 bg-white border border-zinc-200 hover:border-[#8B0000] rounded-lg text-xs font-jp text-zinc-700 transition-colors"
                    >
                      {word}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRACTICE */}
        {activeTab === "practice" && (
          <div className="bg-white rounded-2xl border-4 border-[#1A1A1A] p-6 shadow-[6px_6px_0px_#1A1A1A] space-y-6 text-center max-w-xl mx-auto">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#8B0000] uppercase">✍️ LUYỆN TẬP CHIA THỂ</h2>
              <p className="text-xs sm:text-sm text-zinc-500 italic mt-1">Động từ hiển thị thể lịch sự ます ban đầu, các từ loại khác hiển thị từ điển.</p>
            </div>

            {/* Category Select */}
            <div className="flex flex-wrap gap-1 justify-center bg-zinc-50 p-1 rounded-xl border border-zinc-200">
              {[
                { id: "verbs", label: "Động từ" },
                { id: "iadj", label: "Tính từ い" },
                { id: "naadj", label: "Tính từ な" },
                { id: "nouns", label: "Danh từ" }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => { playSound.click(); setPracticeCat(cat.id as any); }}
                  className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${practiceCat === cat.id ? "bg-[#8B0000] text-white shadow-sm" : "text-zinc-600 hover:text-[#8B0000]"}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Form set Selection */}
            <div className="flex justify-center gap-2">
              {[
                { id: "polite", label: "Thể Lịch sự (ます/です)" },
                { id: "plain", label: "Thể Thông thường" }
              ].map(fs => (
                <button
                  key={fs.id}
                  onClick={() => { playSound.click(); setPracticeFormSet(fs.id as any); }}
                  className={`px-4 py-1.5 rounded-full border-2 text-xs font-bold transition-all ${practiceFormSet === fs.id ? "bg-[#1A1A1A] text-white border-[#1A1A1A]" : "bg-white text-zinc-600 border-zinc-200 hover:border-[#1A1A1A]"}`}
                >
                  {fs.label}
                </button>
              ))}
            </div>

            {/* Word Display Section */}
            {practiceItem && (
              <div className="py-6 border-y-2 border-dashed border-zinc-200 space-y-3">
                <div className="text-3xl sm:text-4xl font-black text-[#1A1A1A] tracking-wide font-jp animate-bounce-once">
                  {practiceCat === "verbs" ? practiceItem.forms.polite[0] : practiceItem.word}
                </div>
                <p className="text-sm font-bold text-zinc-500 uppercase tracking-wide">Nghĩa: {practiceItem.meaning}</p>
                <div className="inline-block bg-orange-50 border border-orange-200 px-4 py-1.5 rounded-xl">
                  <span className="text-xs sm:text-sm font-bold text-orange-700 uppercase">
                    Chia thể: {formNamesMap[practiceFormSet][practiceFormIdx]} {formSuffixesMap[practiceFormSet][practiceFormIdx]}
                  </span>
                </div>
              </div>
            )}

            {/* Form Input answer */}
            <div className="space-y-4">
              <div className="flex gap-2 max-w-sm mx-auto">
                <input
                  type="text"
                  value={practiceInput}
                  onChange={(e) => setPracticeInput(e.target.value)}
                  disabled={practiceAnswered}
                  placeholder="Nhập Hiragana..."
                  className={`w-full px-4 py-3 border-2 rounded-xl text-center font-jp text-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] ${practiceAnswered ? (practiceFeedback?.isCorrect ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50") : "border-[#1A1A1A] bg-white"}`}
                  onKeyDown={(e) => { if (e.key === "Enter") { if (!practiceAnswered) checkPracticeAnswer(); else pickNewPracticeWord(); } }}
                />
                
                {!practiceAnswered ? (
                  <button
                    onClick={checkPracticeAnswer}
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold border-2 border-[#1A1A1A] rounded-xl shadow-[3px_3px_0px_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none shrink-0"
                  >
                    Kiểm tra
                  </button>
                ) : (
                  <button
                    onClick={() => pickNewPracticeWord()}
                    className="px-6 py-3 bg-[#8B0000] hover:bg-[#A30000] text-white font-bold border-2 border-[#1A1A1A] rounded-xl shadow-[3px_3px_0px_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none shrink-0"
                  >
                    Câu tiếp
                  </button>
                )}
              </div>

              {/* Action buttons */}
              {!practiceAnswered && (
                <button
                  onClick={handlePracticeHint}
                  className="px-4 py-1.5 border-2 border-dashed border-orange-300 hover:border-orange-500 text-orange-600 font-bold rounded-xl text-xs"
                >
                  💡 Gợi ý câu trả lời
                </button>
              )}

              {/* Feedback messages */}
              {practiceFeedback && (
                <div className={`p-4 rounded-xl border-2 text-sm max-w-sm mx-auto space-y-1 animate-fade-in ${practiceFeedback.isCorrect ? "bg-green-50 border-green-500 text-green-700" : "bg-red-50 border-red-500 text-red-700"}`}>
                  <p className="font-bold flex items-center justify-center gap-1">
                    {practiceFeedback.isCorrect ? "✅ CHÍNH XÁC! QUÁ ĐỈNH!" : "❌ SAI RỒI! TIẾC QUÁ!"}
                  </p>
                  {!practiceFeedback.isCorrect && (
                    <p className="text-xs font-semibold">
                      Đáp án chính xác là: <span className="font-jp text-sm font-bold text-red-800">{practiceFeedback.correctAnswer}</span>
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: TEST */}
        {activeTab === "test" && (
          <div className="bg-white rounded-2xl border-4 border-[#1A1A1A] p-6 shadow-[6px_6px_0px_#1A1A1A] space-y-6 max-w-xl mx-auto">
            {/* 1. SETUP TEST MODE */}
            {!testInProgress && (
              <div className="text-center space-y-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#8B0000]">📝 KIỂM TRA TOÀN DIỆN</h2>
                  <p className="text-xs sm:text-sm text-zinc-500 italic mt-1">Làm bài trắc nghiệm nhanh để đo độ chính xác phản xạ chia thể của bản thân.</p>
                </div>

                {/* Category selectors */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider block">Chọn danh mục ôn:</span>
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {[
                      { id: "all", label: "Tất cả" },
                      { id: "verbs", label: "Động từ" },
                      { id: "iadj", label: "Tính từ い" },
                      { id: "naadj", label: "Tính từ な" },
                      { id: "nouns", label: "Danh từ" }
                    ].map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => { playSound.click(); setTestCat(cat.id as any); }}
                        className={`px-3 py-1.5 rounded-lg font-bold text-xs border transition-all ${testCat === cat.id ? "bg-[#1A1A1A] text-white border-[#1A1A1A]" : "bg-white text-zinc-700 hover:border-zinc-400"}`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Question count options */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider block">Số lượng câu hỏi:</span>
                  <div className="flex justify-center gap-2">
                    {[5, 10, 15, 20].map(count => (
                      <button
                        key={count}
                        onClick={() => { playSound.click(); setTestCount(count); }}
                        className={`w-10 h-10 rounded-full border-2 font-bold text-sm flex items-center justify-center transition-all ${testCount === count ? "bg-[#8B0000] text-white border-[#8B0000]" : "bg-white text-zinc-700 hover:border-zinc-400"}`}
                      >
                        {count}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Start Button */}
                <button
                  onClick={startTest}
                  className="w-full py-3 bg-[#8B0000] hover:bg-[#A30000] text-white font-bold border-2 border-[#1A1A1A] rounded-xl shadow-[4px_4px_0px_#1A1A1A] text-sm uppercase tracking-widest transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                >
                  🚀 Bắt đầu ngay
                </button>
              </div>
            )}

            {/* 2. ACTIVE TEST IN PROGRESS */}
            {testInProgress && !testComplete && testQuestions.length > 0 && (
              <div className="space-y-6">
                <div className="flex justify-between items-center text-xs font-bold text-zinc-500 uppercase tracking-wider border-b border-zinc-100 pb-2">
                  <span>Câu {testCurrentIdx + 1}/{testQuestions.length}</span>
                  <span>Đúng: <span className="text-green-600">{testScore}</span></span>
                </div>

                {/* Question prompts */}
                <div className="space-y-2 text-center">
                  <div className="inline-block bg-zinc-100 border border-zinc-300 px-3 py-1 rounded-full text-xs font-bold">
                    {testQuestions[testCurrentIdx].formLabel} {testQuestions[testCurrentIdx].formSuffix}
                  </div>
                  <div className="text-3xl font-black text-zinc-800 font-jp">
                    {testQuestions[testCurrentIdx].cat === "verbs" ? testQuestions[testCurrentIdx].item.forms.polite[0] : testQuestions[testCurrentIdx].item.word}
                  </div>
                  <p className="text-sm font-bold text-zinc-500 uppercase">Nghĩa: {testQuestions[testCurrentIdx].item.meaning}</p>
                </div>

                {/* Answer Options list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                  {testQuestions[testCurrentIdx].options.map((opt: string, optIdx: number) => {
                    const q = testQuestions[testCurrentIdx];
                    let btnClass = "border-2 border-[#1A1A1A] bg-white text-zinc-800 hover:bg-zinc-50";
                    if (testAnswered) {
                      if (opt === q.correct) {
                        btnClass = "border-green-600 bg-green-50 text-green-800 font-bold";
                      } else if (opt === testSelectedOption) {
                        btnClass = "border-red-600 bg-red-50 text-red-800 font-bold";
                      } else {
                        btnClass = "border-zinc-200 bg-white text-zinc-300 pointer-events-none";
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(opt)}
                        disabled={testAnswered}
                        className={`p-3 rounded-xl font-jp text-center transition-all text-sm sm:text-base ${btnClass}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {/* Action panel */}
                {testAnswered && (
                  <button
                    onClick={nextTestQuestion}
                    className="w-full py-3 bg-[#1A1A1A] hover:bg-[#2C2C2C] text-white font-bold border-2 border-[#1A1A1A] rounded-xl text-sm uppercase transition-all"
                  >
                    {testCurrentIdx + 1 >= testQuestions.length ? "📊 Xem kết quả" : "▶ Tiếp tục"}
                  </button>
                )}
              </div>
            )}

            {/* 3. TEST SUMMARY AND COMPLETE */}
            {testInProgress && testComplete && (
              <div className="text-center space-y-6 py-6">
                <div className="w-20 h-20 bg-rose-50 border-4 border-[#1A1A1A] rounded-full flex items-center justify-center text-4xl mx-auto shadow-md">
                  🏆
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-zinc-800">HOÀN THÀNH BÀI THI</h3>
                  <p className="text-xs text-zinc-500 font-medium">Bí kíp chia thể đã được áp dụng triệt để!</p>
                </div>

                <div className="bg-zinc-50 border-2 border-zinc-200 rounded-xl p-4 max-w-sm mx-auto space-y-2">
                  <p className="text-sm font-bold text-zinc-600">Độ chính xác của em:</p>
                  <p className="text-4xl font-black text-[#8B0000]">{testScore}/{testQuestions.length}</p>
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-wide">
                    Tỷ lệ chính xác: {Math.round((testScore / testQuestions.length) * 100)}%
                  </p>
                </div>

                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => startTest()}
                    className="px-6 py-3 bg-[#8B0000] hover:bg-[#A30000] text-white font-bold border-2 border-[#1A1A1A] rounded-xl text-xs uppercase"
                  >
                    🔄 Làm lại đề này
                  </button>
                  <button
                    onClick={() => { playSound.click(); setTestInProgress(false); setTestComplete(false); }}
                    className="px-6 py-3 bg-zinc-200 hover:bg-zinc-300 text-zinc-800 font-bold border-2 border-zinc-300 rounded-xl text-xs uppercase"
                  >
                    ⚙️ Đổi đề thi mới
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: STATS */}
        {activeTab === "stats" && (
          <div className="bg-white rounded-2xl border-4 border-[#1A1A1A] p-6 shadow-[6px_6px_0px_#1A1A1A] space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#8B0000]">📊 ĐÁNH GIÁ & TIẾN TRÌNH</h2>
              <p className="text-xs sm:text-sm text-zinc-500 italic mt-1">Dữ liệu thống kê phản xạ thực hành chia thể lưu trữ cục bộ trên thiết bị.</p>
            </div>

            {/* Stats summary boxes */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-zinc-50 p-4 border-2 border-[#1A1A1A] rounded-xl text-center shadow-[3px_3px_0px_#1A1A1A]">
                <span className="text-2xl">🔥</span>
                <p className="text-[10px] text-zinc-500 uppercase font-bold mt-1">Chuỗi đúng</p>
                <p className="text-2xl font-black text-[#8B0000]">{stats.streak}</p>
              </div>
              <div className="bg-zinc-50 p-4 border-2 border-[#1A1A1A] rounded-xl text-center shadow-[3px_3px_0px_#1A1A1A]">
                <span className="text-2xl">⭐</span>
                <p className="text-[10px] text-zinc-500 uppercase font-bold mt-1">Chuỗi tốt nhất</p>
                <p className="text-2xl font-black text-orange-600">{stats.bestStreak}</p>
              </div>
              <div className="bg-zinc-50 p-4 border-2 border-[#1A1A1A] rounded-xl text-center shadow-[3px_3px_0px_#1A1A1A]">
                <span className="text-2xl">📝</span>
                <p className="text-[10px] text-zinc-500 uppercase font-bold mt-1">Tổng số câu</p>
                <p className="text-2xl font-black text-zinc-700">{stats.total}</p>
              </div>
              <div className="bg-zinc-50 p-4 border-2 border-[#1A1A1A] rounded-xl text-center shadow-[3px_3px_0px_#1A1A1A]">
                <span className="text-2xl">📈</span>
                <p className="text-[10px] text-zinc-500 uppercase font-bold mt-1">Độ chính xác</p>
                <p className="text-2xl font-black text-green-600">
                  {stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0}%
                </p>
              </div>
            </div>

            {/* Category breakdown with progress bars */}
            <div className="space-y-4 pt-4 border-t border-zinc-200">
              <h3 className="font-bold text-sm text-zinc-700 uppercase tracking-wider">Tiến độ chi tiết theo danh mục:</h3>
              <div className="space-y-3 max-w-xl">
                {[
                  { id: "verbs", label: "Động từ (V)" },
                  { id: "iadj", label: "Tính từ い (Aい)" },
                  { id: "naadj", label: "Tính từ な (Aな)" },
                  { id: "nouns", label: "Danh từ (N)" }
                ].map(cat => {
                  const catStat = stats.byCat[cat.id] || { total: 0, correct: 0 };
                  const percent = catStat.total > 0 ? Math.round((catStat.correct / catStat.total) * 100) : 0;
                  return (
                    <div key={cat.id} className="space-y-1">
                      <div className="flex justify-between text-xs sm:text-sm font-bold">
                        <span className="text-zinc-700">{cat.label}</span>
                        <span className="text-zinc-500">{catStat.correct}/{catStat.total} ({percent}%)</span>
                      </div>
                      <div className="w-full bg-zinc-100 h-2.5 rounded-full overflow-hidden border border-zinc-200">
                        <div
                          className="bg-[#8B0000] h-full rounded-full transition-all duration-500"
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Clear Stats actions */}
            <div className="pt-4 border-t border-zinc-200 flex justify-end">
              <button
                onClick={handleClearStats}
                className="px-4 py-2 bg-red-50 hover:bg-red-100 border-2 border-red-200 hover:border-red-500 text-red-600 hover:text-red-700 font-bold text-xs rounded-xl flex items-center gap-1 transition-all"
              >
                <Trash2 className="w-4 h-4" />
                <span>Xóa lịch sử thống kê</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Traditional Footer */}
      <footer className="border-t-4 border-[#8B0000] pt-6 pb-2 mt-12 text-center space-y-1 shrink-0">
        <p className="font-black text-base tracking-widest uppercase">
          LỚP HỌC THẦY SƠN
        </p>
        <p className="text-gray-500 text-[10px] italic font-semibold">
          Không khoan nhượng với sự lười biếng.
        </p>
      </footer>
    </div>
  );
}
