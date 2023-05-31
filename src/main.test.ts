// jestの動作確認用のテストコードです。削除してから課題を始めてください。
import { greet } from './main';

test('the data is peanut butter', () => {
  expect(1).toBe(1);
});

test('greeting', () => {
  expect(greet('Foo')).toBe('Hello Foo');
});
