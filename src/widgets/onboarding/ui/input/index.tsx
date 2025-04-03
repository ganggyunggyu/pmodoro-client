import React from 'react';

interface OnboardingInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  helper: string; // helper는 string 타입으로 정의
}

export const OnboardingInput: React.FC<OnboardingInputProps> = ({
  helper, // helper 값을 구조 분해 할당으로 가져오기
  ...props // 나머지 props는 자동으로 전달
}) => {
  return (
    <section className="w-6/12 flex flex-col gap-3">
      <div className="p-3 w-10/12 border border-alt rounded-lg">
        <input
          {...props} // input의 나머지 속성들을 자동으로 전달
        />
      </div>
      <span className="text-xs text-black-alt">{helper}</span>{' '}
      {/* helper 텍스트 출력 */}
    </section>
  );
};
