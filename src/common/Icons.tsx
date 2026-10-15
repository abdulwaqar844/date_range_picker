import React from 'react';

export const CalendarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 1024 1024"
    width="14"
    height="14"
    fill="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V360h656v480zm0-552H184v-56h128v32c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-32h256v32c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-32h128v56z" />
  </svg>
);

export const ClockIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 1024 1024"
    width="14"
    height="14"
    fill="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372zm142.4-239.5l-104.9-72.3V296c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v200c0 2.6 1.3 5.1 3.5 6.6l125.6 86.5c3.6 2.5 8.6 1.6 11.1-2l36.7-53.3c2.5-3.6 1.5-8.6-2-11.3z" />
  </svg>
);

export const CloseCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 1024 1024"
    width="12"
    height="12"
    fill="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155-130.1-155a7.8 7.8 0 01-1.9-5.1c0-4.4 3.6-8 8-8l66.1.3L512 460.6l99.4-118.5 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 510l130.1 155c1.2 1.4 1.8 3.2 1.8 5.1 0 4.5-3.5 8.1-8 8.1z" />
  </svg>
);

export const LeftChevron: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 1024 1024" width="12" height="12" fill="currentColor" {...props}>
    <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" />
  </svg>
);

export const RightChevron: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 1024 1024" width="12" height="12" fill="currentColor" {...props}>
    <path d="M288 218.3V141c0-6.7 7.7-10.4 12.9-6.3l450.8 352.1a31.86 31.86 0 010 50.3L300.9 889.2c-5.3 4.1-12.9.4-12.9-6.3v-77.3c0-4.9 2.3-9.6 6.1-12.6l360-281-360-281.1c-3.9-3-6.1-7.7-6.1-12.6z" />
  </svg>
);

export const DoubleLeftChevron: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 1024 1024" width="12" height="12" fill="currentColor" {...props}>
    <path d="M272.9 512l265.4-207.4c5.3-4.1 12.9-.4 12.9 6.3v77.3c0 4.9-2.3 9.6-6.1 12.6l-180 140.5 180 140.5c3.8 3 6.1 7.7 6.1 12.6v77.3c0 6.7-7.7 10.4-12.9 6.3L272.9 512zm256 0l265.4-207.4c5.3-4.1 12.9-.4 12.9 6.3v77.3c0 4.9-2.3 9.6-6.1 12.6l-180 140.5 180 140.5c3.8 3 6.1 7.7 6.1 12.6v77.3c0 6.7-7.7 10.4-12.9 6.3L528.9 512z" />
  </svg>
);

export const DoubleRightChevron: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 1024 1024" width="12" height="12" fill="currentColor" {...props}>
    <path d="M751.1 512l-265.4 207.4c-5.3 4.1-12.9.4-12.9-6.3v-77.3c0-4.9 2.3-9.6 6.1-12.6l180-140.5-180-140.5c-3.8-3-6.1-7.7-6.1-12.6v-77.3c0-6.7 7.7-10.4 12.9-6.3L751.1 512zm-256 0l-265.4 207.4c-5.3 4.1-12.9.4-12.9-6.3v-77.3c0-4.9 2.3-9.6 6.1-12.6l180-140.5-180-140.5c-3.8-3-6.1-7.7-6.1-12.6v-77.3c0-6.7 7.7-10.4 12.9-6.3L495.1 512z" />
  </svg>
);

export const SwapRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 1024 1024" width="14" height="14" fill="currentColor" {...props}>
    <path d="M873.1 596.2l-164-208A32 32 0 00684 376h-64.8c-6.7 0-10.4 7.7-6.3 12.9L764.2 576H152c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h612.2L612.9 827.1c-4.1 5.3-.4 12.9 6.3 12.9H684c9.6 0 18.7-4.3 24.8-11.8l164.3-208a32 32 0 000-24z" />
  </svg>
);
