// jestの動作確認用のテストコードです。削除してから課題を始めてください。
export const delayMillis = (delayMs: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, delayMs));

export const greet = (name: string): string => `Hello ${name}`;

export const foo = async (): Promise<boolean> => {
  console.log(greet('World'));
  await delayMillis(1000);
  console.log('done');
  return true;
};
