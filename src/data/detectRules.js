// 파일명 키워드 → ASPICE 프로세스 자동 감지 테이블
// 순서 중요: 더 구체적인 패턴을 앞에 배치 (예: SUP.10은 SUP.1보다 먼저)
export const PROCESS_DETECT_RULES = [
  // ── 직접 프로세스 ID 패턴 ──
  { id: "SUP.10", patterns: [/sup[._-]?10(?!\d)/i] },
  { id: "SYS.2",  patterns: [/sys[._-]?2(?!\d)/i] },
  { id: "SYS.3",  patterns: [/sys[._-]?3(?!\d)/i] },
  { id: "SYS.4",  patterns: [/sys[._-]?4(?!\d)/i] },
  { id: "SYS.5",  patterns: [/sys[._-]?5(?!\d)/i] },
  { id: "SWE.1",  patterns: [/swe[._-]?1(?!\d)/i] },
  { id: "SWE.2",  patterns: [/swe[._-]?2(?!\d)/i] },
  { id: "SWE.3",  patterns: [/swe[._-]?3(?!\d)/i] },
  { id: "SWE.4",  patterns: [/swe[._-]?4(?!\d)/i] },
  { id: "SWE.5",  patterns: [/swe[._-]?5(?!\d)/i] },
  { id: "SWE.6",  patterns: [/swe[._-]?6(?!\d)/i] },
  { id: "SUP.1",  patterns: [/sup[._-]?1(?!\d)/i] },
  { id: "SUP.8",  patterns: [/sup[._-]?8(?!\d)/i] },
  { id: "SUP.9",  patterns: [/sup[._-]?9(?!\d)/i] },
  { id: "MAN.3",  patterns: [/man[._-]?3(?!\d)/i] },
  // ── 문서 유형 약어 (영문) ──
  { id: "SYS.2",  patterns: [/\bsrs\b/i, /system[_\-\s]req/i, /sys[_\-\s]req/i] },
  { id: "SYS.3",  patterns: [/\bsad\b/i, /system[_\-\s]arch/i, /sys[_\-\s]arch/i] },
  { id: "SYS.4",  patterns: [/\bsiv\b/i, /system[_\-\s]integ/i] },
  { id: "SYS.5",  patterns: [/\bsvs\b/i, /system[_\-\s]verif/i] },
  { id: "SWE.1",  patterns: [/\bswrs\b/i, /sw[_\-\s]req/i, /software[_\-\s]req/i] },
  { id: "SWE.2",  patterns: [/\bswad\b/i, /sw[_\-\s]arch/i, /software[_\-\s]arch/i] },
  { id: "SWE.3",  patterns: [/\bddd\b/i, /detailed[_\-\s]design/i, /unit[_\-\s]design/i] },
  { id: "SWE.4",  patterns: [/\bsut\b/i, /unit[_\-\s]test/i, /unit[_\-\s]verif/i] },
  { id: "SWE.5",  patterns: [/sw[_\-\s]integr/i, /software[_\-\s]integr/i] },
  { id: "SWE.6",  patterns: [/sw[_\-\s]verif/i, /sw[_\-\s]test/i, /software[_\-\s]verif/i] },
  { id: "SUP.1",  patterns: [/\bqap?\b/i, /quality[_\-\s]assur/i] },
  { id: "SUP.8",  patterns: [/\bcmp\b/i, /config[_\-\s]mgmt/i, /config[_\-\s]man/i, /cm[_\-\s]plan/i] },
  { id: "SUP.9",  patterns: [/\bprm\b/i, /problem[_\-\s]res/i, /incident[_\-\s]rep/i] },
  { id: "SUP.10", patterns: [/\bcrm\b/i, /change[_\-\s]req/i, /change[_\-\s]man/i] },
  { id: "MAN.3",  patterns: [/project[_\-\s]plan/i, /project[_\-\s]man/i, /\bpmp\b/i, /project[_\-\s]sched/i] },
  // ── 한국어 키워드 ──
  { id: "SYS.2",  patterns: [/시스템.?요구사항/, /시스템.?요구/, /시스템.?명세/, /sys.?요구사항/i] },
  { id: "SYS.3",  patterns: [/시스템.?아키텍처/, /시스템.?구조설계/, /시스템.?설계/, /시스템.?구조도/] },
  { id: "SYS.4",  patterns: [/시스템.?통합/, /시스템.?통합검증/, /시스템.?통합시험/] },
  { id: "SYS.5",  patterns: [/시스템.?검증/, /시스템.?시험/, /시스템.?확인/] },
  { id: "SWE.1",  patterns: [/소프트웨어.?요구사항/, /sw.?요구사항/i, /소프트웨어.?요구/, /소프트웨어.?명세/] },
  { id: "SWE.2",  patterns: [/소프트웨어.?아키텍처/, /소프트웨어.?구조설계/, /sw.?아키텍처/i, /소프트웨어.?설계/, /sw.?설계/i] },
  { id: "SWE.3",  patterns: [/상세.?설계/, /소프트웨어.?상세/, /단위.?설계/, /sw.?상세설계/i] },
  { id: "SWE.4",  patterns: [/단위.?테스트/, /단위.?시험/, /단위.?검증/, /유닛.?테스트/, /유닛.?검증/] },
  { id: "SWE.5",  patterns: [/소프트웨어.?통합/, /sw.?통합/i, /컴포넌트.?검증/, /소프트웨어.?통합검증/] },
  { id: "SWE.6",  patterns: [/소프트웨어.?검증/, /소프트웨어.?시험/, /sw.?검증/i, /sw.?시험/i, /소프트웨어.?테스트/] },
  { id: "SUP.1",  patterns: [/품질.?보증/, /품질.?관리/, /품질.?계획/, /qa.?계획/i, /품질.?감사/] },
  { id: "SUP.8",  patterns: [/형상.?관리/, /구성.?관리/, /형상.?계획/, /cm.?계획/i] },
  { id: "SUP.9",  patterns: [/문제.?해결/, /결함.?관리/, /문제.?관리/, /이슈.?관리/, /장애.?관리/] },
  { id: "SUP.10", patterns: [/변경.?요청/, /변경.?관리/, /변경.?이력/] },
  { id: "MAN.3",  patterns: [/프로젝트.?계획/, /프로젝트.?관리/, /사업.?계획/, /개발.?계획/, /일정.?계획/] },
];

export const detectProcess = (filename) => {
  const stem = filename.replace(/\.[^.]+$/, "");
  const normalized = stem.replace(/[_\-.]/g, " ");
  for (const rule of PROCESS_DETECT_RULES) {
    if (rule.patterns.some((p) => p.test(stem) || p.test(normalized))) return rule.id;
  }
  return null;
};
