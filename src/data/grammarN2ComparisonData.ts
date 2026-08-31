export interface TopicGrammarRow {
  stt?: number;
  rootWord?: string;
  rootWordMeaning?: string;
  pattern: string;
  nounForm?: string;
  connection?: string;
  meaning: string;
  exampleJp: string;
  exampleVn: string;
  lesson?: string;
  explanation: string;
  isNew?: boolean;
}

export interface QuizQuestionItem {
  id: number;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  patternContext?: string;
}

export interface CheatSheetRow {
  rootWord: string;
  patternList: string;
  conjugationRule: string;
  modernMeaning: string;
}

export interface ComparisonTopicSection {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  bookSource: string;
  coreBadges: string[];
  essenceSummary: {
    title: string;
    description: string;
    points?: string[];
  }[];
  groups: {
    groupTitle: string;
    groupSubtitle?: string;
    rows: TopicGrammarRow[];
    groupEssence?: {
      title: string;
      content: string;
      distinctions?: { pair: string; diff: string }[];
    };
  }[];
  distinctions?: {
    title: string;
    summary: string;
    items: {
      pattern: string;
      nuance: string;
      example?: string;
      tag?: string;
    }[];
  }[];
  cheatSheet?: {
    title: string;
    headers: string[];
    rows: CheatSheetRow[];
  };
  examTips?: {
    title: string;
    tips: { title: string; content: string; examples?: string[] }[];
  };
  practiceExercises?: {
    title: string;
    type: "multiple_choice" | "fill_blank" | "paired";
    questions: QuizQuestionItem[];
  }[];
}

export const GRAMMAR_N2_COMPARISON_SECTIONS: ComparisonTopicSection[] = [
  // =========================================================================
  // CHUYÊN ĐỀ A: PHÁT TRIỂN TỪ TỪ GỐC (元の言葉に着目)
  // =========================================================================
  {
    id: "topic-a-root-words",
    code: "A",
    title: "Chuyên đề A: Ngữ pháp phát triển từ Từ Gốc",
    subtitle: "元の言葉に着目 (22 Mẫu trọng điểm phát triển từ Động từ & Danh từ)",
    bookSource: "Shin Kanzen Master N2 Bunpou • Phần IV: 文法形式の整理 (Trang 122–123)",
    coreBadges: ["22 Mẫu trọng điểm", "Bổ nghĩa Danh từ (Dạng Bổ nghĩa N)", "Bẫy câu hỏi sao ★"],
    essenceSummary: [
      {
        title: "Bản chất cốt lõi của Ngữ pháp phát triển từ Từ Gốc",
        description: "Hầu hết các mẫu ngữ pháp cao cấp N2 thực chất là dạng chia thể -て hoặc dạng bổ nghĩa danh từ của các động từ/danh từ gốc thuần Nhật. Nắm chắc từ gốc sẽ giúp suy ra ngay ý nghĩa và không bao giờ chọn nhầm trợ từ đi kèm."
      }
    ],
    groups: [
      {
        groupTitle: "Nhóm 1: Các động từ chỉ Mối quan hệ & Hướng tác động",
        groupSubtitle: "Mục 1 – 5 | Động từ gốc: 関する, 対する, 応じる, こたえる, 巡る",
        rows: [
          {
            stt: 1,
            rootWord: "関する (Kansuru)",
            rootWordMeaning: "Liên quan",
            pattern: "〜に関して",
            nounForm: "〜に関する ＋ N",
            meaning: "Về / Liên quan đến...",
            exampleJp: "事故原因に関する調査を行っている。",
            exampleVn: "Đang tiến hành điều tra liên quan đến nguyên nhân vụ tai nạn.",
            lesson: "7課",
            explanation: "Bắt nguồn từ 関する (liên quan). Mang tính trang trọng, văn viết hơn 〜について. Thường dùng trong báo cáo, tin tức, hội thảo."
          },
          {
            stt: 2,
            rootWord: "対する (Taisuru)",
            rootWordMeaning: "Đối mặt, hướng về",
            pattern: "〜に対して",
            nounForm: "〜に対する ＋ N",
            meaning: "Đối với... / Trái ngược với...",
            exampleJp: "目上の人に対してそんな乱暴な言い方をしてはいけない。",
            exampleVn: "Đối với người bề trên, không được dùng cách nói thô lỗ như thế.",
            lesson: "7課",
            explanation: "Thể hiện thái độ, hành động hướng trực tiếp vào đối tượng đứng trước, hoặc so sánh tương phản đối lập giữa 2 vế."
          },
          {
            stt: 3,
            rootWord: "応じる (Oujiru)",
            rootWordMeaning: "Ứng với, theo",
            pattern: "〜に応じて",
            nounForm: "〜に応じた ＋ N",
            meaning: "Tương ứng với... / Phù hợp với...",
            exampleJp: "ご予算に応じてパーティーのメニューを決めます。",
            exampleVn: "Chúng tôi sẽ quyết định thực đơn bữa tiệc tương ứng với ngân sách của quý khách.",
            lesson: "9課",
            explanation: "応じる nghĩa là đáp ứng/thay đổi theo. Vế sau thay đổi tương ứng với mức độ/biến động của vế trước (ngân sách, độ tuổi...)."
          },
          {
            stt: 4,
            rootWord: "こたえる (Kotaeru / 応える)",
            rootWordMeaning: "Đáp lại, đền đáp",
            pattern: "〜にこたえて",
            nounForm: "〜にこたえる ＋ N",
            meaning: "Đáp lại / Đền đáp (kỳ vọng, cổ vũ...)",
            exampleJp: "応援してくれる人の気持ちにこたえて立派な試合をしよう。",
            exampleVn: "Đáp lại tình cảm của người cổ vũ, hãy thi đấu một trận thật xuất sắc.",
            lesson: "7課",
            explanation: "Đi với danh từ kỳ vọng, nguyện vọng (期待, 要望, 声援). Vế sau là nỗ lực để không làm đối phương thất vọng."
          },
          {
            stt: 5,
            rootWord: "巡る (Meguru)",
            rootWordMeaning: "Xoay quanh",
            pattern: "〜をめぐって",
            nounForm: "〜をめぐる ＋ N",
            meaning: "Xoay quanh (tranh chấp, thảo luận...)",
            exampleJp: "離婚したふたりは子供の親権をめぐって争っている。",
            exampleVn: "Hai người ly hôn đang tranh chấp gay gắt xoay quanh quyền nuôi con.",
            lesson: "7課",
            explanation: "巡る là xoay vòng. Diễn tả nhiều ý kiến, tranh luận hay đối lập của nhiều bên xoay quanh một vấn đề cốt lõi."
          }
        ],
        groupEssence: {
          title: "Tư duy bản chất Nhóm 1 (Vector tác động)",
          content: "Các động từ này đều chỉ hướng tác động (vector) hoặc mối tương quan giữa chủ thể và đối tượng.",
          distinctions: [
            {
              pair: "〜に応じて vs 〜にこたえて",
              diff: "〜に応じて (thay đổi linh hoạt theo mức độ biến động vế trước) VS 〜にこたえて (nỗ lực hành động để đền đáp kỳ vọng/nguyện vọng của người khác)."
            }
          ]
        }
      },
      {
        groupTitle: "Nhóm 2: Các động từ chỉ Căn cứ, Dòng chảy & Phạm vi",
        groupSubtitle: "Mục 6 – 11 | Động từ gốc: 基づく, 沿う, 伴う, 渡る, 通じる/通る, 始める",
        rows: [
          {
            stt: 6,
            rootWord: "基づく (Motodzuku)",
            rootWordMeaning: "Dựa trên, căn cứ",
            pattern: "〜に基づいて",
            nounForm: "〜に基づく / 〜に基づいた ＋ N",
            meaning: "Căn cứ vào... / Dựa trên...",
            exampleJp: "最新のデータに基づいて売り上げ計画を立てたい。",
            exampleVn: "Tôi muốn lập kế hoạch doanh số dựa trên các số liệu dữ liệu mới nhất.",
            lesson: "8課",
            explanation: "Lấy tiêu chuẩn, dữ liệu chính xác, pháp luật (データ, 法, 計画) làm cơ sở thực tế cho hành động."
          },
          {
            stt: 7,
            rootWord: "沿う (Sou)",
            rootWordMeaning: "Men theo, bám theo",
            pattern: "〜に沿って",
            nounForm: "〜に沿う / 〜に沿った ＋ N",
            meaning: "Bám sát theo... / Tuân theo...",
            exampleJp: "基本方針に沿って今年度の予算案を作っている。",
            exampleVn: "Đang lập dự toán ngân sách năm nay bám sát theo phương châm cơ bản.",
            lesson: "8課",
            explanation: "沿う là đi dọc theo con đường. Trong ngữ pháp: thực hiện hành động bám sát quy tắc, phương châm, kịch bản mà không chệch ra ngoài."
          },
          {
            stt: 8,
            rootWord: "伴う (Tomonau)",
            rootWordMeaning: "Đi kèm, kéo theo",
            pattern: "〜に伴って",
            nounForm: "〜に伴う ＋ N",
            meaning: "Cùng với... / Kéo theo...",
            exampleJp: "入学する留学生数の変化に伴って、クラス数を変える。",
            exampleVn: "Cùng với sự thay đổi số lượng du học sinh, số lượng lớp cũng đổi theo.",
            lesson: "9課",
            explanation: "Hai sự việc đồng thời xảy ra hoặc sự thay đổi ở vế A kéo theo sự biến đổi tương quan ở vế B cùng lúc."
          },
          {
            stt: 9,
            rootWord: "渡る (Wataru)",
            rootWordMeaning: "Băng qua, trải rộng",
            pattern: "〜にわたって",
            nounForm: "〜にわたる ＋ N",
            meaning: "Suốt / Trải dài khắp (phạm vi)...",
            exampleJp: "7日間にわたる砂漠の旅が始まった。",
            exampleVn: "Chuyến hành trình kéo dài suốt 7 ngày trên sa mạc đã bắt đầu.",
            lesson: "4課",
            explanation: "渡る là băng qua. Diễn tả sự việc kéo dài liên tục trên một phạm vi rộng lớn về thời gian, không gian hay số lần."
          },
          {
            stt: 10,
            rootWord: "通じる / 通る (Tsuujiru / Tooru)",
            rootWordMeaning: "Thông qua",
            pattern: "〜を通じて / 〜を通して",
            nounForm: "〜を通じての / 〜を通しての ＋ N",
            meaning: "Trong suốt (thời gian) / Thông qua (phương tiện)",
            exampleJp: "四季を通じて多くの観光客が訪れる。",
            exampleVn: "Khách du lịch ghé thăm quanh năm suốt cả 4 mùa.",
            lesson: "4課",
            explanation: "(1) Khoảng thời gian xuyên suốt từ đầu tới cuối. (2) Trung gian/phương tiện gián tiếp để đạt được mục đích, kết quả."
          },
          {
            stt: 11,
            rootWord: "始める (Hajimeru)",
            rootWordMeaning: "Bắt đầu",
            pattern: "〜をはじめ（として）",
            nounForm: "〜をはじめとする ＋ N",
            meaning: "Trước tiên phải kể đến... / Đứng đầu là...",
            exampleJp: "校長先生をはじめ、学校の先生方にお世話になった。",
            exampleVn: "Tôi đã nhận sự giúp đỡ từ các thầy cô, trước hết phải kể đến thầy hiệu trưởng.",
            lesson: "4課",
            explanation: "Đưa ra đại diện tiêu biểu nhất đứng đầu danh sách, vế sau đại diện cho toàn thể nhóm tập hợp đó."
          }
        ],
        groupEssence: {
          title: "Tư duy bản chất Nhóm 2 (Nền tảng & Dòng chảy)",
          content: "Các cấu trúc chỉ cơ sở nền tảng hoặc dòng chảy xuyên suốt trong không gian - thời gian.",
          distinctions: [
            {
              pair: "〜に基づいて vs 〜に沿って",
              diff: "〜に基づいて (dựa trên số liệu, sự thật khách quan) VS 〜に沿って (bám sát theo một lộ trình, quy định có sẵn mà không đi chệch hướng)."
            }
          ]
        }
      },
      {
        groupTitle: "Nhóm 3: Danh từ / Động từ cấu thành & Giới hạn",
        groupSubtitle: "Mục 12 – 16 | Từ gốc: 元, もと, 向ける, 限る, 加える",
        rows: [
          {
            stt: 12,
            rootWord: "元 (Moto)",
            rootWordMeaning: "Nguồn gốc, nền tảng",
            pattern: "〜をもとに（して）",
            nounForm: "〜をもとにした ＋ N",
            meaning: "Dựa trên... (để sáng tạo cái mới)",
            exampleJp: "この小説は作者自身の体験をもとに書かれた。",
            exampleVn: "Tiểu thuyết này viết dựa trên trải nghiệm thực tế của tác giả.",
            lesson: "8課",
            explanation: "Khác với に基づいて (dữ liệu), をもとに dùng khi lấy ý tưởng, phôi mẫu, cốt truyện để sáng tạo tác phẩm mới."
          },
          {
            stt: 13,
            rootWord: "もと (Moto)",
            rootWordMeaning: "Dưới sự, dưới bóng",
            pattern: "〜のもとで / 〜のもとに",
            nounForm: "(Ít dùng bổ nghĩa trực tiếp)",
            meaning: "Dưới sự (chỉ dẫn) / Dưới điều kiện...",
            exampleJp: "チームは新しい監督のもとで練習に励んでいる。",
            exampleVn: "Cả đội nỗ lực luyện tập dưới sự dẫn dắt của huấn luyện viên mới.",
            lesson: "8課",
            explanation: "〜のもとで đi với người (chỉ dạy, che chở); 〜のもとに đi với trạng thái, điều kiện trừu tượng (了解, 管理)."
          },
          {
            stt: 14,
            rootWord: "向ける (Mukeru)",
            rootWordMeaning: "Hướng về",
            pattern: "〜向けだ",
            nounForm: "〜向けに / 〜向けの ＋ N",
            meaning: "Dành cho... / Hướng tới đối tượng...",
            exampleJp: "このマンションは一人暮らしの高齢者向けだ。",
            exampleVn: "Căn hộ này thiết kế dành riêng cho người cao tuổi sống độc thân.",
            lesson: "8課",
            explanation: "Sản phẩm, dịch vụ được thiết kế/sản xuất có chủ đích hướng tới đối tượng mục tiêu cụ thể."
          },
          {
            stt: 15,
            rootWord: "限る (Kagiru)",
            rootWordMeaning: "Giới hạn",
            pattern: "〜に限らず / 〜に限り",
            nounForm: "〜に限った ＋ N",
            meaning: "Không chỉ riêng... / Chỉ trong giới hạn...",
            exampleJp: "男性に限らず、女性も多く参加している。",
            exampleVn: "Không chỉ riêng nam giới, phụ nữ cũng tham gia rất đông.",
            lesson: "6課",
            explanation: "Xuất phát từ việc đặt ra ranh giới/giới hạn: 〜に限らず là không bó hẹp, 〜に限り là chỉ duy nhất."
          },
          {
            stt: 16,
            rootWord: "加える (Kuaeru)",
            rootWordMeaning: "Thêm vào",
            pattern: "〜に加えて",
            nounForm: "〜に加えた ＋ N",
            meaning: "Không chỉ... mà thêm vào đó còn...",
            exampleJp: "電気代に加えて、ガス代も値上がりした。",
            exampleVn: "Không chỉ tiền điện mà thêm vào đó tiền gas cũng tăng giá.",
            lesson: "6課",
            explanation: "Cộng thêm một yếu tố khác cùng chiều (cùng tốt hoặc cùng xấu) vào điều đã có sẵn."
          }
        ],
        groupEssence: {
          title: "Tư duy bản chất Nhóm 3 (Phạm vi, Giới hạn & Nguồn gốc)",
          content: "Các cấu trúc thể hiện phạm vi, giới hạn và nguồn gốc phát sinh.",
          distinctions: [
            {
              pair: "〜をもとに vs 〜に基づいて",
              diff: "〜をもとに (nguyên liệu, ý tưởng sáng tác ra tác phẩm mới) VS 〜に基づいて (căn cứ dữ liệu, sự thật khách quan để hành động)."
            },
            {
              pair: "〜のもとで vs 〜のもとに",
              diff: "〜のもとで (chỉ dẫn dưới con người: thầy cô, cha mẹ) VS 〜のもとに (dưới điều kiện, sự chi phối trừu tượng: quản lý, đồng ý)."
            }
          ]
        }
      },
      {
        groupTitle: "Nhóm 4: Các động từ Phủ định, Phán đoán & So sánh",
        groupSubtitle: "Mục 17 – 22 | Từ gốc: 問う, 関わる, 違わない, きまる, 越す, 過ぎる",
        rows: [
          {
            stt: 17,
            rootWord: "問う (Tou)",
            rootWordMeaning: "Hỏi, đòi hỏi",
            pattern: "〜を問わず",
            nounForm: "(Thường làm trạng ngữ)",
            meaning: "Bất kể... / Không phân biệt...",
            exampleJp: "年齢・性別を問わず、多くの人に愛されている。",
            exampleVn: "Bất kể tuổi tác, giới tính, sản phẩm đều được yêu thích.",
            lesson: "11課",
            explanation: "問わない = Không đòi hỏi điều kiện. Vế sau áp dụng cho tất cả mọi đối tượng bình đẳng."
          },
          {
            stt: 18,
            rootWord: "関わる / 係る (Kakawaru)",
            rootWordMeaning: "Liên quan",
            pattern: "〜にかかわらず",
            nounForm: "(Thường làm trạng ngữ)",
            meaning: "Bất kể... / Cho dù có... hay không",
            exampleJp: "参加するしないにかかわらず、連絡してください。",
            exampleVn: "Dù có tham gia hay không, xin vui lòng hãy liên lạc.",
            lesson: "11課",
            explanation: "Kết quả vế sau hoàn toàn độc lập với biến số thay đổi ở điều kiện trước."
          },
          {
            stt: 19,
            rootWord: "違わない (Chigawanai)",
            rootWordMeaning: "Không sai lệch",
            pattern: "〜に違いない",
            connection: "普通形 ＋ に違いない",
            meaning: "Chắc chắn là... (không thể sai được)",
            exampleJp: "彼女はきっとすてきな服を着てくるに違いない。",
            exampleVn: "Cô ấy chắc chắn sẽ diện một bộ đồ tuyệt đẹp đến.",
            lesson: "22課",
            explanation: "Bắt nguồn từ 違いがない. Phán đoán có căn cứ, suy luận logic mạnh."
          },
          {
            stt: 20,
            rootWord: "きまる (Kimaru / 決まる)",
            rootWordMeaning: "Được quyết định",
            pattern: "〜にきまっている",
            connection: "普通形 ＋ にきまっている",
            meaning: "Nhất định là... / Khỏi phải nói cũng biết",
            exampleJp: "そんなうそ、ばれるにきまっている。",
            exampleVn: "Lời nói dối cỡ đó thì nhất định sẽ bị lộ tẩy thôi.",
            lesson: "22課",
            explanation: "Phán đoán mang tính quy luật tự nhiên hoặc trực giác chủ quan tuyệt đối."
          },
          {
            stt: 21,
            rootWord: "越す (Kosu)",
            rootWordMeaning: "Vượt qua",
            pattern: "〜に越したことはない",
            connection: "V-辞書形 ＋ に越したことはない",
            meaning: "...thì vẫn tốt nhất / Không gì hơn...",
            exampleJp: "安く買えるに越したことはない。",
            exampleVn: "Nếu có thể mua được giá rẻ thì vẫn là tốt nhất.",
            lesson: "23課",
            explanation: "Không giải pháp nào 'vượt qua' được điều này, coi đây là phương án tối ưu."
          },
          {
            stt: 22,
            rootWord: "過ぎる (Sugiru)",
            rootWordMeaning: "Vượt quá",
            pattern: "〜にすぎない",
            connection: "N / 普通形 ＋ にすぎない",
            meaning: "Chỉ là... / Không vượt quá mức...",
            exampleJp: "わたしは当たり前のことをしたにすぎません。",
            exampleVn: "Tôi chỉ làm những việc đương nhiên nên làm mà thôi.",
            lesson: "23課",
            explanation: "Giới hạn mức độ sự việc, khẳng định nó không vượt quá (過ぎない) ranh giới."
          }
        ]
      }
    ],
    examTips: {
      title: "Bí quyết làm bài tập 'Từ gốc' trong đề thi JLPT N2",
      tips: [
        {
          title: "📌 1. Quy tắc chuyển đổi danh từ (Danh từ hóa ngữ pháp)",
          content: "• Nối 2 vế câu (Trạng ngữ): Luôn chia về thể -て (ví dụ: 〜に関して, 〜に基づいて, 〜に沿って).\n• Bổ nghĩa cho Danh từ đứng sau: Phải chuyển động từ gốc về dạng Thể từ điển (辞書形) hoặc Thể quá khứ (〜た):\n  - 〜に関する N | 〜に対する N | 〜をめぐる N\n  - 〜に基づく N / 〜に基づいた N | 〜に沿う N / 〜に沿った N\n  - 〜をもとにした N | 〜をはじめとする N | 〜を通じての N"
        },
        {
          title: "⭐ 2. Cạm bẫy bài tập Ngữ pháp dấu sao (★)",
          content: "• Tìm ngay trợ từ đi kèm: Khi thấy cấu trúc thể て, hãy tìm ngay trợ từ 「に」 hoặc 「を」 đứng trước danh từ thích hợp:\n  - Đi với に: 〜に関して, 〜に対して, 〜に基づいて, 〜に沿って, 〜にこたえて.\n  - Đi với を: 〜をめぐって, 〜をもとに, 〜をはじめ, 〜を問わず.\n• Nhận diện động từ vế sau: Với 〜をめぐって, vế sau bắt buộc là động từ tranh luận/đối lập (争う, 議論する, 対立する)."
        }
      ]
    }
  },

  // =========================================================================
  // CHUYÊN ĐỀ B: CÁCH NÓI DÙNG 「言う・する」
  // =========================================================================
  {
    id: "topic-b-iu-suru",
    code: "B",
    title: "Chuyên đề B: Cách nói dùng 「言う・する」",
    subtitle: "「言う・する」を使った言い方 (17 Mẫu cốt lõi + Tư duy bản chất)",
    bookSource: "Shin Kanzen Master N2 Bunpou • Phần IV: 文法形式の整理 (Trang 124–125)",
    coreBadges: ["17 Mẫu cốt lõi", "Tư duy bản chất", "Giải mã bẫy thi"],
    essenceSummary: [
      {
        title: "🗣️ Bản chất của động từ 「言う」 (Nói)",
        description: "Đại diện cho việc bộc lộ ra lời nói, nêu ý kiến, trích dẫn, đưa ra ví dụ, gọi tên hay thừa nhận một phát ngôn từ bản thân hoặc người khác."
      },
      {
        title: "🧠 Bản chất của động từ 「する」 (Làm / Cho là)",
        description: "Đại diện cho suy nghĩ, phán đoán, đánh giá nội tâm, tình huống giả định hoặc đặt mình vào vị trí/lập trường của một đối tượng cụ thể."
      }
    ],
    groups: [
      {
        groupTitle: "Nhóm 1: Các cấu trúc dùng động từ 「言う」 (Iu - Nói)",
        groupSubtitle: "Mục 1 – 7 | Gồm 6 mẫu đã học + 1 mẫu bổ sung mới (*)",
        rows: [
          {
            stt: 1,
            pattern: "〜といった",
            meaning: "Những thứ như là...",
            exampleJp: "ケーキやクッキーといったお菓子が好きだ。",
            exampleVn: "Tôi thích các loại bánh kẹo như là bánh ngọt hay bánh quy.",
            lesson: "10課",
            explanation: "Liệt kê các ví dụ tiêu biểu cụ thể đứng trước để tóm tắt, đại diện cho danh từ chung phía sau (AやBといったN)."
          },
          {
            stt: 2,
            pattern: "〜といえば",
            meaning: "Nhắc đến... / Nói là... thì đúng là",
            exampleJp: "あ、そうだ。雪といえば、スキー旅行はどうしようか。",
            exampleVn: "À phải rồi. Nhắc đến tuyết, chuyến đi trượt tuyết tính sao đây?",
            lesson: "13課",
            explanation: "Lấy một chủ đề vừa được nhắc tới để liên tưởng mở rộng thông tin, hoặc xác nhận/thừa nhận một khía cạnh đúng thực tế."
          },
          {
            stt: 3,
            pattern: "〜というと",
            meaning: "Nói đến... / Nói vậy có nghĩa là...",
            exampleJp: "畑というと、ふつう広い土地を想像するだろう。",
            exampleVn: "Nói đến ruộng vườn, người ta thường sẽ hình dung ra mảnh đất rộng.",
            lesson: "13課",
            explanation: "Gợi ngay hình ảnh/đặc trưng tiêu biểu nhất trong tâm trí, hoặc dùng để hỏi lại nhằm xác nhận ý của đối phương."
          },
          {
            stt: 4,
            pattern: "〜といったら",
            meaning: "Nói về mức độ của... thì...",
            exampleJp: "代表的な日本料理といったら、すしやてんぷらだ。",
            exampleVn: "Nói về món ăn tiêu biểu của Nhật Bản thì chính là sushi và tempura.",
            lesson: "13課",
            explanation: "Đưa ra ví dụ điển hình nhất; hoặc nhấn mạnh mức độ cực kỳ cao, phi thường của sự việc/cảm xúc vượt ngoài sức diễn tả."
          },
          {
            stt: 5,
            pattern: "〜といっても",
            meaning: "Nói là... nhưng thực ra...",
            exampleJp: "料理ができるといっても、簡単なものだけだ。",
            exampleVn: "Nói là biết nấu ăn đấy nhưng cũng chỉ là mấy món đơn giản thôi.",
            lesson: "14課",
            explanation: "Thừa nhận sự thật ở vế trước nhưng đính chính/giới hạn lại ở vế sau rằng thực tế không hoành tráng như hình dung."
          },
          {
            stt: 6,
            pattern: "〜からといって",
            meaning: "Chỉ vì (cho rằng)... mà...",
            exampleJp: "好きだからといって、そればかり食べてはいけない。",
            exampleVn: "Chỉ vì thích mà chỉ ăn mỗi món đó là không được đâu.",
            lesson: "14課",
            explanation: "Phủ định quan điểm thông thường: Chỉ vì lý do A thì không thể coi kết quả B là đương nhiên (vế sau thường đi với 〜わけではない / 〜とは限らない)."
          },
          {
            stt: 7,
            pattern: "〜とはいいながら",
            meaning: "Mặc dù nói là... nhưng thực tế...",
            exampleJp: "わたしはベテランとはいいながら、生徒たちに教えてもらえることの方が多い。",
            exampleVn: "Tuy nói là người kỳ cựu nhưng tôi lại được các học sinh chỉ dạy nhiều hơn.",
            lesson: "課外 *",
            explanation: "Cấu trúc mới: Thừa nhận sự thật ở Vế 1 (〜ではあるが), nhưng Vế 2 lại đi ngược lại hoàn toàn so với dự đoán thông thường. Mang sắc thái khiêm nhường hoặc ngạc nhiên.",
            isNew: true
          }
        ],
        groupEssence: {
          title: "Mẹo ghi nhớ nhóm 「言う」",
          content: "Toàn bộ nhóm này đều xoay quanh ngôn ngữ và phát ngôn: Đưa ra ví dụ danh từ (〜といった) • Liên tưởng chủ đề (〜といえば) • Định nghĩa đặc trưng (〜というと) • Đính chính thực tế (〜といっても, 〜とはいいながら) • Bác bỏ lý do duy nhất (〜からといって)."
        }
      },
      {
        groupTitle: "Nhóm 2: Các cấu trúc dùng động từ 「する」 (Suru - Làm / Cho là)",
        groupSubtitle: "Mục 1 – 10 | Căn cứ, Giả định điều kiện, Nhượng bộ & Lập trường",
        rows: [
          {
            stt: 1,
            pattern: "〜からして",
            meaning: "Ngay từ... (đã thấy...)",
            exampleJp: "この映画は題名からして怖そうだ。",
            exampleVn: "Bộ phim này ngay từ cái tên đã thấy có vẻ đáng sợ rồi.",
            lesson: "4課",
            explanation: "Nêu ra một điểm nhỏ, khởi đầu hoặc yếu tố tiêu biểu để từ đó đánh giá/phán đoán toàn bộ tổng thể (thường mang tính tiêu cực)."
          },
          {
            stt: 2,
            pattern: "〜としたら",
            meaning: "Nếu giả sử (cho) là...",
            exampleJp: "無人島で過ごすとしたら、何を持っていきますか。",
            exampleVn: "Giả sử nếu sống trên đảo hoang, bạn sẽ mang theo thứ gì?",
            lesson: "15課",
            explanation: "Đặt ra một tình huống giả định thuần túy (có thể không có thật ở hiện tại) để từ đó suy luận cảm xúc, hướng xử lý."
          },
          {
            stt: 3,
            pattern: "〜とすれば",
            meaning: "Nếu trường hợp đó xảy ra...",
            exampleJp: "事故を免れるとすれば、奇跡の幸運といえる。",
            exampleVn: "Nếu mà thoát khỏi tai nạn thì chỉ có thể coi là may mắn kỳ diệu.",
            lesson: "15課",
            explanation: "Giả định một điều kiện mang tính khả thi hoặc logic toán học để từ đó rút ra kết luận/đánh giá tất yếu."
          },
          {
            stt: 4,
            pattern: "〜とすると",
            meaning: "Nếu giả định là... thì...",
            exampleJp: "彼が犯人ではないとすると、本当の犯人はだれだろう。",
            exampleVn: "Nếu giả định anh ta không phải thủ phạm, vậy thủ phạm thật là ai?",
            lesson: "15課",
            explanation: "Dựa trên tiền đề giả định ở vế trước để suy luận câu hỏi, phán đoán logic tiếp theo một cách tự nhiên."
          },
          {
            stt: 5,
            pattern: "〜にしても",
            meaning: "Cho dù có (cho) là... đi nữa",
            exampleJp: "時間がないにしても、連絡ぐらいしてほしい。",
            exampleVn: "Dù là không có thời gian đi nữa thì cũng muốn anh liên lạc một tiếng.",
            lesson: "15課",
            explanation: "Thừa nhận hoặc giả định điều kiện ở vế trước, nhưng nhấn mạnh vế sau vẫn không thay đổi hoặc bộc lộ sự bất mãn, phàn nàn."
          },
          {
            stt: 6,
            pattern: "〜にしろ",
            meaning: "Cho dù là... hay là...",
            exampleJp: "何をするにしろ、心を込めて取り組みたい。",
            exampleVn: "Dù làm bất cứ việc gì đi nữa, tôi cũng muốn dốc lòng thực hiện.",
            lesson: "15課",
            explanation: "Diễn tả sự nhượng bộ giả định (đồng nghĩa với 〜にしても), thường đi theo cặp 〜にしろ〜にしろ (dù là A hay B)."
          },
          {
            stt: 7,
            pattern: "〜にしては",
            meaning: "Dù là... (so với tiêu chuẩn)",
            exampleJp: "この絵は子供が描いたにしてはよく描けている。",
            exampleVn: "Bức tranh này so với việc do trẻ con vẽ thì vẽ đẹp đấy chứ.",
            lesson: "19課",
            explanation: "So với tiêu chuẩn thông thường của đối tượng đứng trước thì kết quả vế sau bất ngờ ngoài dự đoán (khác với 〜わりに đi với từ trừu tượng)."
          },
          {
            stt: 8,
            pattern: "〜にしたら",
            meaning: "Đứng ở vị trí của... (tâm lý)",
            exampleJp: "お母さんにしたら、君のことが心配で注意するのだ。",
            exampleVn: "Đứng ở góc độ người mẹ thì vì lo lắng cho con nên mới nhắc nhở.",
            lesson: "19課",
            explanation: "Đặt mình vào vị trí/tâm lý của người khác để đồng cảm hoặc suy đoán cảm xúc, nỗi lòng của họ."
          },
          {
            stt: 9,
            pattern: "〜にすれば",
            meaning: "Đứng ở lập trường của... (lý tính)",
            exampleJp: "店にすれば、なるべく安く買い高く売りたいはずだ。",
            exampleVn: "Đứng ở lập trường cửa hàng thì họ muốn mua rẻ bán đắt là điều đương nhiên.",
            lesson: "19課",
            explanation: "Đặt mình vào vị trí, tư cách của đối tượng khác để phân tích, giải thích cho suy nghĩ hoặc lập luận lợi ích của họ."
          },
          {
            stt: 10,
            pattern: "〜からすると / 〜からいうと",
            meaning: "Nhìn từ... / Xét từ góc độ...",
            exampleJp: "① 服装からすると、この製品の方が高級らしい。 ② 医師の立場からいうと、この治療方法は認められない。",
            exampleVn: "① Nhìn từ trang phục thì... | ② Xét từ góc độ bác sĩ thì...",
            lesson: "課外 *",
            explanation: "Cặp cấu trúc mới: • 〜からすると: Dựa trên dấu hiệu, vẻ bề ngoài để phán đoán suy luận. • 〜からいうと: Dựa trên góc độ, lập trường chuyên môn để đưa ra nhận xét/đánh giá.",
            isNew: true
          }
        ],
        groupEssence: {
          title: "Phân biệt Bộ Ba Giả Định 「と＋する」",
          content: "Cả 3 mẫu đều bắt nguồn từ việc coi/giả định điều gì đó là thật (〜とする):",
          distinctions: [
            {
              pair: "〜としたら",
              diff: "Giả định tưởng tượng thuần túy, vế sau thường là câu hỏi/ý chí/nguyện vọng (〜たい / 〜か)."
            },
            {
              pair: "〜とすれば",
              diff: "Giả định điều kiện logic, vế sau là kết luận/đánh giá mang tính tất yếu."
            },
            {
              pair: "〜とすると",
              diff: "Giả định làm tiền đề mở ra suy luận kế tiếp (〜だろうか / 〜はずだ)."
            }
          ]
        }
      }
    ],
    distinctions: [
      {
        title: "🎯 1. Phân biệt cốt lõi 「言う」 vs 「する」 khi làm bài thi JLPT",
        summary: "Dấu hiệu nhận biết nhanh trong ngữ cảnh câu:",
        items: [
          {
            pattern: "Nhóm 「いう」 (〜からといって, 〜といっても, 〜とはいいながら)",
            nuance: "Dùng khi câu nói đề cập đến lời nói, danh nghĩa, lý do được phát ngôn ra ngoài.",
            tag: "Phát ngôn bên ngoài"
          },
          {
            pattern: "Nhóm 「する」 (〜としたら, 〜にしては, 〜にしたら, 〜からすると)",
            nuance: "Dùng khi câu diễn tả suy nghĩ nội tâm, giả định, phán đoán hoặc cảm xúc từ vị trí của ai đó.",
            tag: "Nội tâm / Lập trường"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // CHUYÊN ĐỀ C: TỪ NGỮ VĂN PHONG CỔ (古い言葉を使った言い方)
  // =========================================================================
  {
    id: "topic-c-classical",
    code: "C",
    title: "Chuyên đề C: Từ ngữ Văn phong Cổ",
    subtitle: "古い言葉を使った言い方 (5 Từ cổ gốc: ず, べし, まい, つつ, せよ)",
    bookSource: "Shin Kanzen Master N2 Bunpou • Phần IV: 文法形式の整理 (Trang 126–127)",
    coreBadges: ["5 Từ cổ gốc", "Giải mã Văn phong cổ (文語)", "Cheat Sheet N2"],
    essenceSummary: [
      {
        title: "💡 Bản chất của các mẫu ngữ pháp gốc từ cổ trong N2",
        description: "Trong tiếng Nhật N2, nhiều mẫu ngữ pháp mang dấu vết của tiếng Nhật cổ (文語 - Bungo). Thay vì học vẹt rời rạc từng mẫu, chỉ cần nắm vững nghĩa cốt lõi của 5 từ cổ gốc (〜ず, べし, まい, つつ, せよ), bạn sẽ dễ dàng suy ra bản chất và dịch chính xác toàn bộ hệ thống ngữ pháp liên quan."
      }
    ],
    groups: [
      {
        groupTitle: "1. Từ cổ gốc: 「〜ず」 (ZU) ➔ Nghĩa hiện đại: 「〜ない」 (PHỦ ĐỊNH: KHÔNG)",
        groupSubtitle: "Hệ thống 7 mẫu ngữ pháp N2 phát triển từ trợ từ phủ định cổ 「ず」 & 「ざる」",
        rows: [
          {
            stt: 1,
            pattern: "〜もかまわず",
            meaning: "Mặc kệ / Bất chấp...",
            exampleJp: "人目もかまわず買い物をした。",
            exampleVn: "Mặc kệ ánh nhìn của người xung quanh, vẫn mua sắm.",
            lesson: "11課",
            explanation: "かまわず = 構わない (không bận tâm). Hành động bất chấp ánh mắt/hoàn cảnh xung quanh."
          },
          {
            stt: 2,
            pattern: "〜を問わず",
            meaning: "Bất kể / Không phân biệt...",
            exampleJp: "性別を問わず募集する。",
            exampleVn: "Tuyển dụng không phân biệt giới tính.",
            lesson: "11課",
            explanation: "問わず = 問わない (không hỏi/không đòi hỏi). Áp dụng cho mọi đối tượng bình đẳng."
          },
          {
            stt: 3,
            pattern: "〜にかかわらず",
            meaning: "Bất kể / Dù có hay không",
            exampleJp: "距離にかかわらず一律200円。",
            exampleVn: "Bất kể cự ly xa gần, đồng giá 200 yên.",
            lesson: "11課",
            explanation: "かかわらず = 関わらない (không liên quan/không bị chi phối). Kết quả vế sau luôn cố định."
          },
          {
            stt: 4,
            pattern: "〜にもかかわらず",
            meaning: "Mặc dù... thế mà...",
            exampleJp: "悪天候にもかかわらず作業を続けた。",
            exampleVn: "Mặc dù thời tiết xấu thế mà vẫn tiếp tục làm việc.",
            lesson: "14課",
            explanation: "Bất chấp điều kiện cản trở ở vế trước, hành động vế sau vẫn diễn ra trái ngược với quy luật tự nhiên."
          },
          {
            stt: 5,
            pattern: "〜ずじまいだ",
            meaning: "Rốt cuộc không kịp làm...",
            exampleJp: "どこへも行かずじまいだった。",
            exampleVn: "Rốt cuộc chưa đi được đâu thì kỳ nghỉ đã kết thúc.",
            lesson: "20課",
            explanation: "しまい (kết thúc) + ず (không làm). Diễn tả sự việc kết thúc trong tiếc nuối khi chưa kịp thực hiện."
          },
          {
            stt: 6,
            pattern: "〜ずにはいられない",
            meaning: "Không thể không / Kìm không nổi",
            exampleJp: "水を飲まずにはいられない。",
            exampleVn: "Khát quá không thể nào không uống nước được.",
            lesson: "25課",
            explanation: "Phủ định kép: Không thể giữ nguyên trạng thái không làm (ず) ➔ Thôi thúc tự nhiên của cảm xúc/thể chất."
          },
          {
            stt: 7,
            pattern: "〜ざるを得ない",
            meaning: "Đành phải / Buộc phải làm",
            exampleJp: "事実を言わざるを得ない。",
            exampleVn: "Tôi đành buộc phải nói ra sự thật.",
            lesson: "25課",
            explanation: "ざる là dạng bổ nghĩa cổ của ず. 〜ざるを得ない = Không thể nhận được kết quả nếu không làm ➔ Bắt buộc phải làm dù không muốn."
          }
        ],
        groupEssence: {
          title: "Bản chất cốt lõi của 「ず / ざる」",
          content: "Trong tiếng Nhật cổ, 「ず」 là thể phủ định (tương đương ない ngày nay). Khi đứng trước danh từ, nó biến thành 「ざる」. Do đó: Khi gặp bất kỳ mẫu nào chứa ず / ざる, hãy lập tức dịch theo nghĩa phủ định 'KHÔNG' để suy ra toàn bộ ý nghĩa câu!"
        }
      },
      {
        groupTitle: "2 – 5. Các từ cổ gốc: 「べし」, 「まい」, 「つつ」, 「せよ」",
        groupSubtitle: "Hệ thống các mẫu chỉ Nghĩa vụ, Phủ định suy đoán/ý chí, Tiến trình & Mệnh lệnh cổ",
        rows: [
          {
            stt: 8,
            rootWord: "べし (Beshi) = しなければならない (Nên / Bắt buộc)",
            pattern: "〜べきだ",
            meaning: "Nên / Cần phải làm...",
            exampleJp: "今できることは今するべきだ。",
            exampleVn: "Việc có thể làm ngay bây giờ thì nên làm ngay.",
            lesson: "23課",
            explanation: "べし trong tiếng cổ mang nghĩa nghĩa vụ/đương nhiên. Sang N2 chỉ lời khuyên, bổn phận đạo đức nên làm."
          },
          {
            stt: 9,
            rootWord: "べし (Beshi)",
            pattern: "〜べきではない",
            meaning: "Không nên / Không được...",
            exampleJp: "先生に失礼を言うべきではない。",
            exampleVn: "Không nên nói những lời thất lễ với thầy cô.",
            lesson: "23課",
            explanation: "Khuyên răn mạnh mẽ về mặt đạo đức xã hội: Tuyệt đối không nên làm điều thất lễ/sai trái."
          },
          {
            stt: 10,
            rootWord: "まい (Mai) = 〜ないだろう (Suy đoán)",
            pattern: "〜まい (Suy đoán)",
            meaning: "Chắc là không...",
            exampleJp: "間違いはあるまい。",
            exampleVn: "Chắc chắn là sẽ không có sai sót nào đâu.",
            lesson: "22課",
            explanation: "Phủ định suy đoán cổ: あるまい = ないだろう (Người nói tin chắc sự việc không xảy ra)."
          },
          {
            stt: 11,
            rootWord: "まい (Mai)",
            pattern: "〜ではあるまいか",
            meaning: "Chẳng phải là... hay sao?",
            exampleJp: "解決しないのではないであろうか。",
            exampleVn: "Chẳng phải là vấn đề này sẽ không giải quyết được hay sao?",
            lesson: "22課",
            explanation: "Hỏi tu từ khẳng định nhẹ nhàng: 〜ではないだろうか (Bày tỏ phán đoán nghi vấn lịch sự)."
          },
          {
            stt: 12,
            rootWord: "まい (Mai) = 〜ないでおこう (Ý chí)",
            pattern: "〜まい (Ý chí)",
            meaning: "Quyết không làm...",
            exampleJp: "こんな失敗は二度とするまい。",
            exampleVn: "Tôi quyết tâm sẽ không bao giờ lặp lại thất bại này nữa.",
            lesson: "24課",
            explanation: "Phủ định ý chí mạnh mẽ của ngôi thứ nhất: するまい = しないつもりだ / 絶対にしない."
          },
          {
            stt: 13,
            rootWord: "まい (Mai)",
            pattern: "〜（よう）か〜まいか",
            meaning: "Nên hay không nên làm...",
            exampleJp: "掃除ロボットを買おうか買わまいか。",
            exampleVn: "Đang phân vân có nên mua robot hút bụi hay là không.",
            lesson: "24課",
            explanation: "Cặp đối lập giữa Thể ý chí (〜よう) và Phủ định ý chí (〜まい): Bày tỏ sự lưỡng lự, đắn đo."
          },
          {
            stt: 14,
            rootWord: "つつ (Tsutsu) = 〜ながら (Song song)",
            pattern: "〜つつ",
            meaning: "Vừa... vừa... (Song song)",
            exampleJp: "散歩のことを考えつつ歩く。",
            exampleVn: "Vừa đi bộ vừa suy nghĩ về chuyến dạo chơi.",
            lesson: "3課",
            explanation: "Hành động song song: = 〜ながら nhưng mang sắc thái văn viết trang trọng hơn."
          },
          {
            stt: 15,
            rootWord: "つつ (Tsutsu) = 〜ている (Tiến trình)",
            pattern: "〜つつある",
            meaning: "Đang dần dần... (Tiến trình)",
            exampleJp: "街は復興に向かいつつある。",
            exampleVn: "Thành phố đang dần dần hướng tới sự phục hồi.",
            lesson: "2課",
            explanation: "Tiến trình biến đổi đang tiếp diễn từng bước: = 〜ているところだ / だんだん変化している."
          },
          {
            stt: 16,
            rootWord: "つつ (Tsutsu) = 〜けれども (Tương phản)",
            pattern: "〜つつ（も）",
            meaning: "Dù biết/nghĩ... nhưng...",
            exampleJp: "悪いと知りつつ嘘をついた。",
            exampleVn: "Dù biết là xấu nhưng tôi vẫn nói dối.",
            lesson: "14課",
            explanation: "Tương phản nội tâm: Đi với động từ tri giác (知る, 思う), dù tâm trí nhận thức được nhưng hành động lại trái ngược."
          },
          {
            stt: 17,
            rootWord: "せよ (Seyo) = しろ (Mệnh lệnh) / 〜でも (Nhượng bộ)",
            pattern: "〜にせよ",
            meaning: "Cho dù là... đi nữa",
            exampleJp: "正しいにせよ謝罪はしなさい。",
            exampleVn: "Cho dù bạn có đúng đi nữa thì cũng hãy xin lỗi đi.",
            lesson: "15課",
            explanation: "Nhượng bộ giả định: = 〜にしても (Dù chấp nhận điều kiện vế trước thì vế sau vẫn bất biến)."
          },
          {
            stt: 18,
            rootWord: "せよ (Seyo)",
            pattern: "〜にせよ〜にせよ",
            meaning: "Dù là A hay là B...",
            exampleJp: "与党にせよ野党にせよ責任がある。",
            exampleVn: "Dù là đảng cầm quyền hay đảng đối lập thì đều có trách nhiệm.",
            lesson: "10課",
            explanation: "Liệt kê các trường hợp đối lập để khẳng định kết luận chung: = 〜にしても〜にしても."
          }
        ]
      }
    ],
    cheatSheet: {
      title: "⚡ Bảng quy tắc chuyển đổi nhanh từ cổ sang hiện đại (JLPT N2 Cheat Sheet)",
      headers: ["Từ Cổ Gốc", "Dạng thức ngữ pháp N2", "Quy tắc chia động từ", "Ý nghĩa tương đương trong tiếng Nhật hiện đại"],
      rows: [
        {
          rootWord: "〜ず / ざる",
          patternList: "〜もかまわず / 〜ずじまい / 〜ずにはいられない / 〜ざるを得ない",
          conjugationRule: "V-ない (bỏ ない) ＋ ず / ざる (Suru ➔ せず / せざる)",
          modernMeaning: "〜ない (Không bận tâm / Không làm kịp / Không kìm được / Buộc phải làm)"
        },
        {
          rootWord: "べし",
          patternList: "〜べきだ / 〜べきではない",
          conjugationRule: "V-辞書形 ＋ べき (Suru ➔ するべき / すべき)",
          modernMeaning: "〜しなければならない / 〜したほうがいい (Nên / Bắt buộc phải làm)"
        },
        {
          rootWord: "まい",
          patternList: "〜まい / 〜ではあるまいか / 〜（よう）か〜まいか",
          conjugationRule: "Nhóm 1: V-辞書形 / Nhóm 2,3: V-bỏ ます ＋ まい",
          modernMeaning: "〜ないだろう (Chắc là không) / 〜ないでおこう (Quyết không làm)"
        },
        {
          rootWord: "つつ",
          patternList: "〜つつ / 〜つつある / 〜つつ（も）",
          conjugationRule: "V-ます (bỏ ます) ＋ つつ",
          modernMeaning: "〜ながら (Vừa...vừa) / 〜ている (Đang dần dần) / 〜けれども (Mặc dù)"
        },
        {
          rootWord: "せよ",
          patternList: "〜にせよ / 〜にせよ〜にせよ",
          conjugationRule: "普通形 (N/Na bỏ だ) ＋ にせよ",
          modernMeaning: "〜にしても (Cho dù là... đi nữa / Dù là A hay B thì cũng...)"
        }
      ]
    }
  },

  // =========================================================================
  // CHUYÊN ĐỀ D: CÁCH NÓI DÙNG 「もの・こと」
  // =========================================================================
  {
    id: "topic-d-mono-koto",
    code: "D",
    title: "Chuyên đề D: Cách nói dùng 「もの・こと」",
    subtitle: "「もの・こと」を使った言い方 (27 Cấu trúc toàn diện + Bản chất vs Sự việc)",
    bookSource: "Shin Kanzen Master N2 Bunpou • Phần IV: 文法形式の整理 (Trang 128–131)",
    coreBadges: ["27 Cấu trúc toàn diện", "Bản chất vs Sự việc", "Mẹo phân biệt bẫy Mono vs Koto"],
    essenceSummary: [
      {
        title: "🌸 Bản chất của 「もの」 (Vật / Bản chất / Cảm xúc)",
        description: "Dùng khi bộc lộ cảm xúc, hoài niệm, khát khao, cảm thán nội tâm hoặc nhấn mạnh quy luật tự nhiên, chân lý khách quan vốn có của đời sống/xã hội."
      },
      {
        title: "📋 Bản chất của 「こと」 (Sự việc / Khái niệm / Thông tin)",
        description: "Dùng khi giải thích sự việc, đưa ra lời khuyên/mệnh lệnh hành động cụ thể, truyền đạt thông tin (truyền ngôn) hoặc nhận định một tình huống xác định."
      }
    ],
    groups: [
      {
        groupTitle: "Bảng 1: Các cấu trúc chứa 「もの」 (MONO) - 14 Mẫu",
        groupSubtitle: "Mục 1 – 14 | Quy luật, Đạo lý, Cảm xúc, Hoài niệm, Nhượng bộ & Giả định",
        rows: [
          {
            stt: 1,
            pattern: "〜ものだ",
            meaning: "Lẽ thường là... (quy luật)",
            exampleJp: "人間は本来一人では生きられないものだ。",
            exampleVn: "Con người vốn dĩ lẽ thường không thể sống một mình được.",
            lesson: "23課",
            explanation: "Nhấn mạnh bản chất, quy luật tự nhiên hoặc chân lý cuộc sống mà ai cũng phải công nhận."
          },
          {
            stt: 2,
            pattern: "〜というものだ",
            meaning: "Thật sự đúng là... (đánh giá)",
            exampleJp: "お金を盗んで逃げるのは、厚かましいというものだ。",
            exampleVn: "Trộm tiền rồi bỏ trốn thì đúng thật là trơ trẽn.",
            lesson: "23課",
            explanation: "Đưa ra nhận định, đánh giá bản chất đích thực của một hành vi/sự việc cụ thể."
          },
          {
            stt: 3,
            pattern: "〜ものだ / 〜ものではない",
            meaning: "Nên / Không nên (đạo lý)",
            exampleJp: "① 人との出会いは大切にするものだ。 ② 簡単に人にお金を貸すものではない。",
            exampleVn: "① Nên trân trọng cuộc gặp gỡ. ② Không nên dễ dãi cho mượn tiền.",
            lesson: "24課",
            explanation: "Lời khuyên, cảnh báo mang tính quy chuẩn đạo đức chung của xã hội người lớn (không khuyên tình huống cá nhân tức thời)."
          },
          {
            stt: 4,
            pattern: "〜たいものだ / 〜てほしいものだ",
            meaning: "Rất muốn... / Mong ước...",
            exampleJp: "① 家族にこんな姿は見せたいものだ。 ② 今度こそ実験が成功してほしいものだ。",
            exampleVn: "① Rất muốn cho gia đình thấy. ② Rất mong lần này thử nghiệm thành công.",
            lesson: "26課",
            explanation: "Bộc lộ tâm nguyện, ao ước tha thiết từ sâu thẳm tâm can (mức độ cảm xúc cao hơn 〜たい / 〜てほしい thông thường)."
          },
          {
            stt: 5,
            pattern: "〜ものだ (Quá khứ)",
            meaning: "Ngày xưa thường... (kỷ niệm)",
            exampleJp: "子供のころはこの川で泳いだものだ。",
            exampleVn: "Hồi còn nhỏ tôi thường hay bơi ở dòng sông này.",
            lesson: "26課",
            explanation: "Đi với động từ thể quá khứ (V-たものだ) để hoài niệm về một thói quen thường lặp lại trong quá khứ xa xưa."
          },
          {
            stt: 6,
            pattern: "〜ものだ (Cảm thán)",
            meaning: "Thật là... biết bao!",
            exampleJp: "時間が過ぎるのは早いものだ。",
            exampleVn: "Thời gian trôi qua thật là nhanh biết bao!",
            lesson: "26課",
            explanation: "Bày tỏ sự cảm thán, xúc động sâu sắc trước một hiện thực diễn ra trước mắt."
          },
          {
            stt: 7,
            pattern: "〜ないもの（だろう）か",
            meaning: "Liệu có cách nào... không nhỉ?",
            exampleJp: "どうにかして母の病気が治らないものか。",
            exampleVn: "Liệu có cách nào chữa khỏi bệnh cho mẹ được không nhỉ?",
            lesson: "26課",
            explanation: "Trăn trở, tha thiết mong mỏi tìm được giải pháp cho một sự việc khó khăn, tưởng chừng bất khả thi."
          },
          {
            stt: 8,
            pattern: "〜ものがある",
            meaning: "Có cảm giác rất...",
            exampleJp: "毎日遠くから通勤するのはつらいものがある。",
            exampleVn: "Hằng ngày đi làm từ nơi xa xôi đúng là có cảm giác rất vất vả.",
            lesson: "26課",
            explanation: "Đứng cuối câu để nhấn mạnh cảm nhận sâu sắc của người nói về một đặc điểm/tính chất nổi bật của sự việc."
          },
          {
            stt: 9,
            pattern: "〜ものの / 〜とはいうものの",
            meaning: "Tuy... nhưng... / Dù nói là...",
            exampleJp: "① 高い着物を買ったものの、着る機会がない。 ② 手術は成功したとはいうものの、まだ心配だ。",
            exampleVn: "① Mua kimono đắt tiền nhưng chưa có dịp mặc. ② Dù nói phẫu thuật thành công nhưng vẫn lo.",
            lesson: "14課",
            explanation: "Thừa nhận thực tế ở vế trước (A là thật) nhưng thực tế vế sau lại không diễn ra suôn sẻ/như kỳ vọng."
          },
          {
            stt: 10,
            pattern: "〜ものなら (Khả năng)",
            meaning: "Nếu có thể... thì rất muốn...",
            exampleJp: "やれるものならやってみる。",
            exampleVn: "Nếu mà có thể làm được thì tôi rất muốn làm thử.",
            lesson: "15課",
            explanation: "Đi với động từ thể khả năng (V-れるものなら) để giả định một việc gần như không thể làm được nhằm bộc lộ ước muốn mãnh liệt."
          },
          {
            stt: 11,
            pattern: "〜（よう）ものなら (Ý chí)",
            meaning: "Nếu lỡ... thì hậu quả tồi tệ",
            exampleJp: "山道で迷おうものなら、この寒さで凍え死にそうだ。",
            exampleVn: "Nếu mà lỡ lạc đường trên núi thì với cái rét này chắc chết cóng mất.",
            lesson: "15課",
            explanation: "Đi với thể ý chí (V-ようものなら) để giả định một việc rủi ro/lỡ xảy ra, vế sau là hậu quả cực kỳ nghiêm trọng."
          },
          {
            stt: 12,
            pattern: "〜もので / 〜ものだから",
            meaning: "Tại vì... (phân bua, bào chữa)",
            exampleJp: "熱が高いものだから、よく寝られませんでした。",
            exampleVn: "Vì bị sốt cao quá nên tôi không thể ngủ ngon được.",
            lesson: "16課",
            explanation: "Đưa ra lý do khách quan mang tính phân bua, giải thích cho sự chậm trễ hoặc tình huống ngoài ý muốn."
          },
          {
            stt: 13,
            pattern: "〜もの (Cuối câu)",
            meaning: "Tại vì... (giao tiếp thân mật)",
            exampleJp: "これ、食べたくない。嫌いなんだもの。",
            exampleVn: "Cái này em không muốn ăn đâu. Tại em ghét nó mà.",
            lesson: "16課",
            explanation: "Đặt ở cuối câu để đưa ra lý do cá nhân, hay dùng trong đàm thoại thân mật hàng ngày (thường là phụ nữ hoặc trẻ em, dạng thân mật 〜もん)."
          },
          {
            stt: 14,
            pattern: "〜ものか",
            meaning: "Tuyệt đối không... / Quyết không",
            exampleJp: "① あいつが時間どおりに来るものか。 ② そんな人と絶対にもう一緒に仕事をするものか。",
            exampleVn: "① Tên đó đời nào đến đúng giờ! ② Tôi quyết không làm việc cùng người đó nữa!",
            lesson: "12/24課",
            explanation: "Phủ định cực kỳ mạnh mẽ kèm cảm xúc bực bội, bác bỏ (絶対〜ない), dạng khẩu ngữ thân mật là 〜もんか."
          }
        ],
        groupEssence: {
          title: "Phân biệt Cặp Giả Định 「ものなら」",
          content: "Hai sắc thái hoàn toàn trái ngược của cấu trúc 〜ものなら:",
          distinctions: [
            {
              pair: "V-khả năng ＋ ものなら",
              diff: "Giả định điều tốt đẹp khó xảy ra ➔ Vế sau là ao ước, nguyện vọng (〜たい / 戻れるものなら戻りたい)."
            },
            {
              pair: "V-ý chí (よう) ＋ ものなら",
              diff: "Giả định sự cố rủi ro lỡ xảy ra ➔ Vế sau là hậu quả tai hại, nguy hiểm (大惨事になる / 怒られる)."
            }
          ]
        }
      },
      {
        groupTitle: "Bảng 2: Các cấu trúc chứa 「こと」 (KOTO) - 13 Mẫu",
        groupSubtitle: "Mục 1 – 13 | Sự việc, Điều kiện bắt buộc, Lời khuyên cụ thể & 5 Mẫu mới bổ sung (*)",
        rows: [
          {
            stt: 1,
            pattern: "〜（のこと）となると",
            meaning: "Hễ đụng tới / Cứ nói đến... là...",
            exampleJp: "山口さんは山のこととなると目が輝く。",
            exampleVn: "Anh Yamaguchi hễ cứ đụng tới chuyện leo núi là mắt lại sáng lên.",
            lesson: "13課",
            explanation: "Thể hiện thái độ, cảm xúc hoặc hành động thay đổi đặc biệt khi chạm tới một chủ đề/lĩnh vực cụ thể."
          },
          {
            stt: 2,
            pattern: "〜ないことには",
            meaning: "Nếu chưa... thì không thể...",
            exampleJp: "お金がないことには、この計画は進められない。",
            exampleVn: "Nếu không có tiền thì kế hoạch này không thể xúc tiến được.",
            lesson: "15課",
            explanation: "Điều kiện tiên quyết: Bắt buộc phải hoàn thành vế trước (A) thì vế sau mới có thể thực hiện được."
          },
          {
            stt: 3,
            pattern: "〜ことだし",
            meaning: "Vì... (nên làm gì đó)",
            exampleJp: "雨もやんだことだし、ちょっと出かけてこよう。",
            exampleVn: "Trời cũng tạnh mưa rồi nên tôi ra ngoài một chút đây.",
            lesson: "17課",
            explanation: "Nêu ra một lý do tiêu biểu trong số nhiều lý do để đưa ra đề xuất, phán đoán hoặc quyết định hành động vế sau."
          },
          {
            stt: 4,
            pattern: "〜のことだから",
            meaning: "Vì là người như... nên chắc chắn...",
            exampleJp: "みち子のことだから、きっと合格できるだろう。",
            exampleVn: "Vì là người chăm chỉ như Michiko nên chắc chắn sẽ thi đỗ thôi.",
            lesson: "17課",
            explanation: "Đi sau danh từ chỉ người: Dựa vào tính cách, thói quen đặc trưng của người đó để suy đoán chắc chắn về kết quả vế sau."
          },
          {
            stt: 5,
            pattern: "〜ことだ (Khuyên trực tiếp)",
            meaning: "Nên / Không nên (khuyên tình huống)",
            exampleJp: "太らないようにするには、夜遅く食べないことだ。",
            exampleVn: "Để không bị béo thì tốt nhất là không nên ăn muộn vào ban đêm.",
            lesson: "24課",
            explanation: "Lời khuyên trực tiếp giải quyết một tình huống/mục tiêu cụ thể trước mắt (V-る / V-ない ＋ ことだ)."
          },
          {
            stt: 6,
            pattern: "〜ことはない",
            meaning: "Không cần thiết phải làm...",
            exampleJp: "電話で済むから、わざわざ行くことはない。",
            exampleVn: "Giải quyết qua điện thoại là được rồi, không cần thiết phải cất công đi.",
            lesson: "24課",
            explanation: "Khuyên bảo, trấn an đối phương rằng không cần phải bận tâm làm việc gì đó (V-る ＋ ことはない = する必要はない)."
          },
          {
            stt: 7,
            pattern: "〜ことだ (Cảm thán)",
            meaning: "Thật là... biết bao!",
            exampleJp: "いい友達がいるのはありがたいことだ。",
            exampleVn: "Có được những người bạn tốt thật là điều đáng quý biết bao.",
            lesson: "26課",
            explanation: "Bày tỏ cảm xúc cảm thán trực tiếp trước một sự việc cụ thể (A-い / A-な ＋ ことだ)."
          },
          {
            stt: 8,
            pattern: "〜ことだろう / 〜ことか",
            meaning: "Biết bao nhiêu! / Biết chừng nào!",
            exampleJp: "① この城を作るのに、何年かかったことだろう。 ② 早く寝ろと子供に何回注意したことか。",
            exampleVn: "① Xây tòa thành này mất bao nhiêu năm trời! ② Đã nhắc con đi ngủ sớm biết bao lần rồi!",
            lesson: "26課",
            explanation: "Thường đi kèm các từ nghi vấn (どんなに, 何回, どれほど) để cảm thán về mức độ vô cùng to lớn hoặc số lượng nhiều."
          },
          {
            stt: 9,
            pattern: "〜こと (Mẫu mới *)",
            meaning: "Hãy... / Phải... (Chỉ thị/Nội quy)",
            exampleJp: "① レポートは5日までに提出すること。 ②【立て札】この池では釣りをしないこと。",
            exampleVn: "① Nộp báo cáo trước ngày 5. ② Biển báo: Không câu cá tại hồ này.",
            lesson: "課外 *",
            explanation: "Cấu trúc mới: Dùng trong bảng thông báo, nội quy, đề thi, quy chế để đưa ra mệnh lệnh, quy định bắt buộc phải tuân theo.",
            isNew: true
          },
          {
            stt: 10,
            pattern: "〜ことなく (Mẫu mới *)",
            meaning: "Không... mà liên tục...",
            exampleJp: "① 夏の間も休むことなく、原稿を書き続けた。 ② 母は何を言われても怒ることなく、いつもにこにこしていた。",
            exampleVn: "① Suốt mùa hè vẫn viết bản thảo không nghỉ. ② Mẹ không hề nổi giận mà luôn tươi cười.",
            lesson: "課外 *",
            explanation: "Cấu trúc mới: Bằng với 〜ないで (văn viết trang trọng). Diễn tả hành động duy trì liên tục mà không bị gián đoạn bởi việc A.",
            isNew: true
          },
          {
            stt: 11,
            pattern: "〜ことに (Mẫu mới *)",
            meaning: "Thật là... (Cảm tưởng)",
            exampleJp: "① 不思議なことに、真冬なのに桜が咲いた。 ② ありがたいことに、両親は健在です。",
            exampleVn: "① Kỳ lạ thay, giữa mùa đông mà hoa anh đào lại nở. ② Thật may là bố mẹ vẫn khỏe mạnh.",
            lesson: "課外 *",
            explanation: "Cấu trúc mới: Đứng ở đầu/giữa câu đi sau tính từ/động từ cảm xúc (嬉しいことに, 驚いたことに) để bộc lộ cảm xúc chủ quan trước khi kể sự việc.",
            isNew: true
          },
          {
            stt: 12,
            pattern: "〜ことは〜が (Mẫu mới *)",
            meaning: "Tuy... thì có... thật, nhưng...",
            exampleJp: "① この本は高いことは高いが、とても役に立つ。 ② あの映画は見たことは見たが、内容がよくわからなかった。",
            exampleVn: "① Đắt thì có đắt thật đấy nhưng rất bổ ích. ② Xem thì có xem rồi nhưng không hiểu rõ.",
            lesson: "課外 *",
            explanation: "Cấu trúc mới: Lặp lại từ ngữ để thừa nhận sự thật ở Vế 1 (A là đúng), nhưng Vế 2 bổ sung một khía cạnh tương phản hoặc không trọn vẹn.",
            isNew: true
          },
          {
            stt: 13,
            pattern: "〜ということだ / 〜とのことだ (Mẫu mới *)",
            meaning: "Nghe nói là... / Báo lại là...",
            exampleJp: "① この店では、野菜は自家製を使っているということだ。 ② 中山さんは今日来られないとのことでした。",
            exampleVn: "① Nghe nói quán này dùng rau tự trồng. ② Anh Nakayama nhắn là hôm nay không đến được.",
            lesson: "課外 *",
            explanation: "Cấu trúc mới: Mẫu truyền ngôn trích dẫn lại thông tin nghe được từ người khác/báo chí (〜とのことだ dùng trang trọng hơn trong thư từ/công việc).",
            isNew: true
          }
        ]
      }
    ],
    distinctions: [
      {
        title: "💡 Bí quyết phân biệt bẫy 'Mono' vs 'Koto' trong đề thi JLPT (Trang 130–131)",
        summary: "Hai điểm mấu chốt phân biệt tuyệt đối:",
        items: [
          {
            pattern: "1. Phân biệt khuyên nhủ: 「〜ことだ」 vs 「〜ものだ」",
            nuance: "• 〜ことだ: Lời khuyên trực tiếp giải quyết tình huống/mục tiêu cụ thể trước mắt (Ví dụ: Muốn biết tin đồn thật hay không thì nên hỏi trực tiếp ➔ 直接本人に確認することだ).\n• 〜ものだ / 〜ものではない: Lời khuyên dựa trên đạo lý, phép tắc ứng xử chung của xã hội (Ví dụ: Khi khách về thì nên đưa tiễn cho đến khi khuất bóng ➔ 見送るものですよ).",
            tag: "Tình huống cụ thể vs Đạo lý xã hội"
          },
          {
            pattern: "2. Phân biệt bộc lộ cảm xúc: 「〜ことに」 vs 「〜ものがある」",
            nuance: "• 〜ことに: Luôn đứng ở đầu câu / giữa câu đóng vai trò làm trạng ngữ nêu cảm tưởng trước khi kể tiếp sự việc (不思議なことに、... / 嬉しいことに、...).\n• 〜ものがある: Luôn đứng ở cuối câu để chốt lại nhận định, cảm nhận sâu sắc về tính chất của sự việc (〜残念なものがある / 〜つらいものがある).",
            tag: "Đầu câu vs Cuối câu"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // CHUYÊN ĐỀ E: CÁCH NÓI DÙNG 「わけ・ところ」
  // =========================================================================
  {
    id: "topic-e-wake-tokoro",
    code: "E",
    title: "Chuyên đề E: Cách nói dùng 「わけ・ところ」",
    subtitle: "「わけ・ところ」を使った言い方 (10 Cấu trúc cốt lõi + Lý lẽ vs Thời điểm/Hoàn cảnh)",
    bookSource: "Shin Kanzen Master N2 Bunpou • Phần IV: 文法形式の整理 (Trang 132–133)",
    coreBadges: ["10 Cấu trúc cốt lõi", "Lý lẽ vs Thời điểm & Khía cạnh", "3 Cặp bẫy kinh điển"],
    essenceSummary: [
      {
        title: "💡 Bản chất của 「わけ」 (Lý do / Lý lẽ / Tính logic)",
        description: "Bắt nguồn từ 「訳」 (nguyên do, ý nghĩa). Toàn bộ nhóm này luôn xoay quanh lý do khách quan, tính logic của sự việc, sự hợp lý hoặc quy luật đương nhiên của vấn đề."
      },
      {
        title: "⏱️ Bản chất của 「ところ」 (Thời điểm / Hoàn cảnh / Khía cạnh)",
        description: "Bắt nguồn từ 「所」 (nơi chốn, thời điểm, trạng thái). Dùng để chỉ mốc thời điểm hành động (suýt soát), trạng thái hoàn cảnh thực tế, hoặc lấy khía cạnh/dấu hiệu làm căn cứ."
      }
    ],
    groups: [
      {
        groupTitle: "Nhóm 1: Các cấu trúc chứa 「わけ」 (Wake - Lý do / Logic)",
        groupSubtitle: "Mục 1 – 5 | Phủ định tuyệt đối, Phủ định một phần, Ràng buộc trách nhiệm & Kết luận logic",
        rows: [
          {
            stt: 1,
            pattern: "〜わけがない",
            meaning: "Tuyệt đối không thể... / Làm gì có chuyện...",
            exampleJp: "こんなに重い荷物、一人で運べるわけがない。",
            exampleVn: "Hành lý nặng thế này, làm sao mà một mình vác nổi được!",
            lesson: "12課",
            explanation: "Phủ định tuyệt đối: Dựa trên cơ sở lý lẽ, logic rõ ràng của người nói để khẳng định 100% không thể xảy ra."
          },
          {
            stt: 2,
            pattern: "〜わけではない / 〜というわけではない",
            meaning: "Không hẳn là... / Không phải là...",
            exampleJp: "① いつでも電話に出られるわけではない。 ② ペンならどれでも同じというわけではない。",
            exampleVn: "① Không hẳn là lúc nào cũng nghe máy được. ② Không phải bút nào cũng như nhau.",
            lesson: "12課",
            explanation: "Phủ định một phần: Phủ định việc '100% luôn luôn hoặc toàn bộ' là như vậy (thực tế vẫn có trường hợp ngoại lệ)."
          },
          {
            stt: 3,
            pattern: "〜わけにはいかない",
            meaning: "Không thể... (do đạo đức/trách nhiệm)",
            exampleJp: "今日は試験なので、休むわけにはいかない。",
            exampleVn: "Hôm nay có bài thi nên tôi không thể nghỉ được.",
            lesson: "18課",
            explanation: "Dù trong lòng muốn làm nhưng về mặt đạo đức, lương tâm, luân lý xã hội hoặc trách nhiệm thì không thể làm."
          },
          {
            stt: 4,
            pattern: "〜ないわけに（は）いかない",
            meaning: "Đành phải... / Không thể không...",
            exampleJp: "生の魚は嫌いだが、勧められたら食べないわけにはいかない。",
            exampleVn: "Tôi ghét cá sống nhưng được mời thì đành phải ăn.",
            lesson: "25課",
            explanation: "Phủ định kép: Dù trong lòng không muốn làm nhưng do phép lịch sự, trách nhiệm xã hội nên bắt buộc phải làm."
          },
          {
            stt: 5,
            pattern: "〜わけだ / 〜というわけだ (Mẫu mới *)",
            meaning: "Thảo nào... / Tính ra là... / Tóm lại là...",
            exampleJp: "①「そんなに勉強したのですか。成績が良いわけですね。」 ②「1人1,000円。ということは7人で7,000円になるわけですね。」",
            exampleVn: "① Thảo nào thành tích tốt thế! ② Tính ra là 7 người hết 7.000 yên.",
            lesson: "課外 *",
            explanation: "Cấu trúc mới: • Thảo nào...: Hiểu ra nguyên do tất yếu sau khi nghe sự thật. • Tính ra là...: Rút ra kết luận logic từ các dữ kiện trước.",
            isNew: true
          }
        ],
        groupEssence: {
          title: "5 Góc nhìn bản chất của 「わけ」",
          content: "• わけがない: Logic khẳng định không thể (絶対〜ない)\n• わけではない: Phủ định một phần (一部否定)\n• わけにはいかない: Ràng buộc trách nhiệm không thể làm\n• ないわけにはいかない: Bắt buộc đành phải làm\n• わけだ: Thấu hiểu lý do tự nhiên (納得・当然の結論)."
        }
      },
      {
        groupTitle: "Nhóm 2: Các cấu trúc chứa 「ところ」 (Tokoro - Thời điểm & Hoàn cảnh)",
        groupSubtitle: "Mục 1 – 5 | Hoàn cảnh thực tế, Tương phản ngược lại, Kết quả sau khi làm & Căn cứ nguồn gốc",
        rows: [
          {
            stt: 1,
            pattern: "〜どころではない",
            meaning: "Không phải lúc... / Không tâm trí nào...",
            exampleJp: "① 騒がしくて勉強どころではない。 ② 忙しくて旅行どころではない。",
            exampleVn: "① Ồn ào không học hành gì được. ② Bận quá không tâm trí đâu đi du lịch.",
            lesson: "12/18課",
            explanation: "Do hoàn cảnh thực tế (quá bận, ồn ào, thiếu tiền) nên hoàn toàn không có dư dả thời gian hay tâm trí để làm việc đó."
          },
          {
            stt: 2,
            pattern: "〜どころか",
            meaning: "Thay vì... thì trái lại... / Đừng nói tới...",
            exampleJp: "独身どころか、子供も3人いる。",
            exampleVn: "Độc thân đâu mà độc thân, trái lại đã có tới 3 đứa con rồi.",
            lesson: "12課",
            explanation: "Bác bỏ hoàn toàn mức độ vế 1 và khẳng định thực tế trái ngược 180 độ hoặc vượt xa mức độ hình dung ban đầu."
          },
          {
            stt: 3,
            pattern: "〜たところ",
            meaning: "Sau khi thử làm... thì nhận được kết quả...",
            exampleJp: "メールを送ったところ、すぐに返事が来た。",
            exampleVn: "Sau khi gửi email thì nhận được hồi âm ngay lập tức.",
            lesson: "20課",
            explanation: "Thử thực hiện một hành động (hỏi, gửi, kiểm tra) thì thu được kết quả/tình trạng mới ngay sau đó."
          },
          {
            stt: 4,
            pattern: "〜ところだった",
            meaning: "Suýt nữa thì... / Suýt chút nữa là...",
            exampleJp: "もう少しで車にぶつかるところだった。",
            exampleVn: "Chút xíu nữa là suýt bị ô tô đâm trúng rồi.",
            lesson: "20課",
            explanation: "Sự việc đã ở sát bờ vực nguy hiểm hoặc thay đổi, nhưng thực tế may mắn đã không xảy ra (もう少しで〜ところだった)."
          },
          {
            stt: 5,
            pattern: "〜ところから / 〜ことから (Mẫu mới *)",
            meaning: "Chính vì (nguyên do/dấu hiệu)... nên...",
            exampleJp: "① ひょうたんに似ているところから、「ひょうたん湖」と命名。 ② 同じ町出身とわかったことから、親しくなった。",
            exampleVn: "① Do hình giống quả bầu nên đặt tên hồ. ② Nhờ đồng hương nên thân thiết.",
            lesson: "課外 *",
            explanation: "Cấu trúc mới: Lấy dấu hiệu bề ngoài (ところから) hoặc sự thật/nguyên do (ことから) làm căn cứ đặt tên hoặc dẫn đến kết quả.",
            isNew: true
          }
        ]
      }
    ],
    distinctions: [
      {
        title: "⚖️ Phân biệt 3 cặp cấu trúc dễ nhầm lẫn nhất giữa 「わけ」 và 「ところ」",
        summary: "Bí quyết phân biệt rạch ròi bản chất để không bao giờ chọn sai:",
        items: [
          {
            pattern: "1. わけにはいかない vs どころではない",
            nuance: "• わけにはいかない: Không thể do đạo đức, trách nhiệm, lương tâm ràng buộc (試験だから休むわけにはいかない).\n• どころではない: Không thể do hoàn cảnh thực tế (quá bận, ồn ào, thiếu tiền) cản trở (忙しくて旅行どころではない).",
            tag: "Đạo đức/Trách nhiệm vs Hoàn cảnh thực tế"
          },
          {
            pattern: "2. わけではない vs どころか",
            nuance: "• わけではない: Phủ định một phần, vẫn có khả năng xảy ra một chút (嫌いなわけではない = không hẳn ghét).\n• どころか: Phủ định hoàn toàn 100% và đưa ra thực tế trái ngược hoàn toàn (独身どころか子供が3人いる).",
            tag: "Phủ định một phần vs Phủ định 100%"
          },
          {
            pattern: "3. ところから vs ことから",
            nuance: "• ところから: Căn cứ dựa vào dấu hiệu bề ngoài, hình dáng quan sát được (形が似ているところから名付けられた).\n• ことから: Căn cứ dựa vào sự thật, lý do mang tính sự việc (同郷だとわかったことから親しくなった).",
            tag: "Hình dáng quan sát vs Sự thật/Nguyên nhân"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // CHUYÊN ĐỀ F: CẶP TỪ & TRỢ TỪ NHẤN MẠNH
  // =========================================================================
  {
    id: "topic-f-paired-particles",
    code: "F",
    title: "Chuyên đề F: Cặp từ & Trợ từ nhấn mạnh",
    subtitle: "二つの言葉を組にする言い方・助詞 (13 Cấu trúc & Trợ từ cốt lõi)",
    bookSource: "Shin Kanzen Master N2 Bunpou • Phần IV: 文法形式の整理 (Trang 134–135)",
    coreBadges: ["13 Cấu trúc & Trợ từ cốt lõi", "Cặp đối ứng vs Trợ từ", "Thang đo mức độ"],
    essenceSummary: [
      {
        title: "🔗 1. Các cấu trúc kết hợp cặp từ (組になる言葉)",
        description: "Dùng để liệt kê nhiều ví dụ song song, so sánh các mặt tình huống, thể hiện sự do dự, hoặc sự việc diễn ra liên tiếp gần như đồng thời."
      },
      {
        title: "💎 2. Các trợ từ nhấn mạnh & Giới hạn (助詞)",
        description: "Dùng để đánh giá mức độ (xem nhẹ, cực đoan, giới hạn tối thiểu), nêu định nghĩa bản chất hoặc phủ định tuyệt đối (〜として〜ない)."
      }
    ],
    groups: [
      {
        groupTitle: "Nhóm 1: Các cấu trúc kết hợp Cặp Từ (二つの言葉を組にする言い方)",
        groupSubtitle: "Mục 1 – 6 | Liệt kê hỗn độn, Phân vân cách gọi, Nhượng bộ đa chiều, Kể lể than phiền & Tiếp nối",
        rows: [
          {
            stt: 1,
            pattern: "〜やら〜やら",
            meaning: "Nào là... nào là... (hỗn độn)",
            exampleJp: "四角いものやら丸いものやら、いろいろな形の皿がある。",
            exampleVn: "Nào là đĩa hình vuông, nào là đĩa tròn... đủ các loại hình dáng.",
            lesson: "10課",
            explanation: "Liệt kê nhiều sự vật, sự việc cùng loại trong tình trạng lộn xộn, hỗn độn hoặc vất vả, bận rộn."
          },
          {
            stt: 2,
            pattern: "〜というか〜というか",
            meaning: "Có thể nói là... mà cũng là...",
            exampleJp: "このクラスはうるさいというか賑やかというか……。",
            exampleVn: "Lớp học này bảo là ồn ào cũng đúng mà bảo là náo nhiệt cũng đúng...",
            lesson: "10課",
            explanation: "Đưa ra 2 cách diễn đạt/đánh giá song song vì người nói chưa biết dùng từ nào để mô tả chính xác nhất."
          },
          {
            stt: 3,
            pattern: "〜にしても〜にしても / 〜にしろ〜にしろ / 〜にせよ〜にせよ",
            meaning: "Cho dù là... hay là...",
            exampleJp: "① 野菜にしても魚にしても、材料は新鮮さが第一だ。 ② 入院するにしろ通院するにしろ、お金がかかる。",
            exampleVn: "① Dù là rau hay cá thì độ tươi ngon vẫn là số một. ② Dù nằm viện hay khám ngoài thì đều tốn tiền.",
            lesson: "10課",
            explanation: "Liệt kê các trường hợp/đối tượng đối lập nhau để nhấn mạnh rằng: Dù trường hợp nào xảy ra thì kết luận vế sau vẫn đúng và bất biến."
          },
          {
            stt: 4,
            pattern: "〜だの〜だの (Mẫu mới *)",
            meaning: "Nào là... nào là... (phàn nàn)",
            exampleJp: "① 部屋は狭いだの暗いだのの不満ばかりだ。 ② ごみの出し方が悪いだのの文句ばかり言う。",
            exampleVn: "① Suốt ngày bất mãn nào là phòng hẹp, nào là tối. ② Toàn cằn nhằn nào là vứt rác sai cách.",
            lesson: "課外 *",
            explanation: "Cấu trúc mới: Liệt kê các lý do, lời phàn nàn, cằn nhằn kèm theo cảm xúc ngán ngẩm, khó chịu (うんざり・不満).",
            isNew: true
          },
          {
            stt: 5,
            pattern: "〜か〜ないかのうちに",
            meaning: "Vừa mới... thì đã ngay lập tức...",
            exampleJp: "夜が明けたか明けないかのうちに家を出た。",
            exampleVn: "Trời vừa mới hửng sáng chưa kịp rõ thì tôi đã rời nhà.",
            lesson: "1課",
            explanation: "Hai hành động diễn ra nối tiếp gần như đồng thời (vừa kết thúc A trong tích tắc là B lập tức xảy ra ngay)."
          },
          {
            stt: 6,
            pattern: "〜（よう）か〜まいか",
            meaning: "Nên... hay không nên... (do dự)",
            exampleJp: "旅行に行こうか行くまいか迷っている。",
            exampleVn: "Tôi đang phân vân đắn đo xem nên đi du lịch hay không nên đi.",
            lesson: "24課",
            explanation: "Cặp đối lập giữa Thể ý chí (〜よう) và Phủ định ý chí (〜まい): Bày tỏ sự lưỡng lự, đấu tranh tâm lý nội tâm."
          }
        ],
        groupEssence: {
          title: "Phân biệt 「〜やら〜やら」 vs 「〜だの〜だの」",
          content: "• 〜やら〜やら: Liệt kê trung tính thể hiện sự hỗn độn, bừa bộn, nhiều thứ cùng lúc (嬉しいやら恥ずかしいやら).\n• 〜だの〜だの: Liệt kê mang sắc thái tiêu cực, phàn nàn, cằn nhằn, ngán ngẩm (給料が安いだの休みが少ないだの文句を言う)."
        }
      },
      {
        groupTitle: "Nhóm 2: Các Trợ từ nhấn mạnh, Đánh giá mức độ & Giới hạn (助詞)",
        groupSubtitle: "Mục 1 – 7 | Định nghĩa, Mức tối thiểu, Xem nhẹ, Mức độ thái quá, Phủ định tuyệt đối & Giới hạn",
        rows: [
          {
            stt: 1,
            pattern: "〜とは",
            meaning: "Khái niệm... có nghĩa là...",
            exampleJp: "留学とは外国で勉強することだ。",
            exampleVn: "Du học có nghĩa là việc đi học tập tại nước ngoài.",
            lesson: "13課",
            explanation: "Đưa ra định nghĩa, thuyết minh bản chất cốt lõi của một từ ngữ/khái niệm mới."
          },
          {
            stt: 2,
            pattern: "〜くらい / 〜ぐらい",
            meaning: "Ít nhất thì cũng... / Cỡ như...",
            exampleJp: "分からない言葉ぐらい自分で調べてきなさい。",
            exampleVn: "Cỡ như từ không hiểu thì ít nhất cũng tự tra trước đi chứ.",
            lesson: "21課",
            explanation: "Đưa ra ví dụ ở mức độ đơn giản, tối thiểu, nhẹ nhàng mà ai cũng có thể làm được."
          },
          {
            stt: 3,
            pattern: "〜など / 〜なんか / 〜なんて",
            meaning: "Mấy thứ như... / Cỡ như...",
            exampleJp: "散歩に行くなんて言わなければよかった。",
            exampleVn: "Biết thế đã chẳng thèm nói mấy câu như là đi dạo bộ.",
            lesson: "21課",
            explanation: "Xem nhẹ, coi thường sự việc hoặc dùng với sắc thái khiêm tốn khi tự nói về bản thân."
          },
          {
            stt: 4,
            pattern: "〜まで / 〜までして / 〜てまで",
            meaning: "Đến mức... / Ngay cả... (thái quá)",
            exampleJp: "この山小屋には電子レンジまである。",
            exampleVn: "Căn chòi trên núi này đến cả lò vi sóng cũng có luôn.",
            lesson: "21課",
            explanation: "Nhấn mạnh mức độ cao bất thường, thái quá vượt ngoài sức tưởng tượng thông thường gây ngạc nhiên."
          },
          {
            stt: 5,
            pattern: "〜として〜ない",
            meaning: "Một... cũng không có...",
            exampleJp: "この寒さには1日として耐えられない。",
            exampleVn: "Cái rét này dù chỉ một ngày tôi cũng không thể chịu nổi.",
            lesson: "21課",
            explanation: "Luôn đi sau đơn vị số 1 (1人, 1日, 1つ) kết hợp với đuôi phủ định để nhấn mạnh sự phủ định tuyệt đối 0%."
          },
          {
            stt: 6,
            pattern: "〜さえ",
            meaning: "Ngay cả... (ví dụ cực đoan)",
            exampleJp: "のどが痛くてお湯さえ飲めない。",
            exampleVn: "Cổ họng đau đến mức ngay cả nước ấm cũng không nuốt nổi.",
            lesson: "21課",
            explanation: "Đưa ra một ví dụ cực đoan nhất (đến việc dễ/nhẹ nhất còn không làm được ➔ nói chi đến việc khác)."
          },
          {
            stt: 7,
            pattern: "〜のみ (Mẫu mới *)",
            meaning: "Chỉ... (Giới hạn trang trọng)",
            exampleJp: "① ここから先は、関係者のみ入場可とする。 ② 土日のみのアルバイトを探している。",
            exampleVn: "① Từ đây trở đi chỉ người có phận sự mới được vào. ② Tìm việc làm thêm chỉ vào thứ 7 và CN.",
            lesson: "課外 *",
            explanation: "Cấu trúc mới: Đồng nghĩa với 〜だけ nhưng mang sắc thái văn viết trang trọng (硬い言い方), dùng trong thông báo, hợp đồng, nội quy.",
            isNew: true
          }
        ],
        groupEssence: {
          title: "Thang đo mức độ của các Trợ từ nhấn mạnh",
          content: "• 〜くらい: Mức tối thiểu, đơn giản nhất (これくらい)\n• 〜さえ: Ví dụ cực đoan nhất (名前さえ書けない)\n• 〜まで: Mức độ thái quá, vượt tầm thông thường (借金してまで買う)\n• 〜のみ: Giới hạn độc quyền (会員のみ)."
        }
      }
    ]
  }
];
