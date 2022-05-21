import { Inverter } from '../../../../shared/out/inverter/src/inverter';
import * as assert from 'assert';

// the reason why these tests are done in the extension directory instead of inverter is because they are used to achieve 100% test coverage
suite('Python Invertion Suite', () => {
  [
    { input: 'if dog < cat: print', output: 'if dog >= cat: print' },
    { input: 'if(dog > cat): print', output: 'if(dog <= cat): print' },
    { input: 'if dog < cat: print(10 + 5)', output: 'if dog >= cat: print(10 + 5)' },
    { input: 'if (dog < cat): print', output: 'if (dog >= cat): print' },
    { input: 'if ((((dog < cat)))): print', output: 'if ((((dog >= cat)))): print' },
    { input: 'if   (  (  (  (  dog   <   cat  )  )  )  )  :   print', output: 'if   (  (  (  (  dog   >=   cat  )  )  )  )  :   print' },
    { input: 'if dog and cat: print', output: 'if !dog or !cat: print' },
    { input: 'if dog or cat: print', output: 'if !dog and !cat: print' },
    { input: 'if dog < "and": print', output: 'if dog >= "and": print' },
    { input: 'elif dog < cat: print', output: 'elif dog >= cat: print' },
    { input: 'if dog < "and": print elif dog < cat: print', output: 'if dog >= "and": print elif dog >= cat: print' },
    { input: 'if (dog < "and"): print elif (dog < cat): print', output: 'if (dog >= "and"): print elif (dog >= cat): print' },
    { input: 'if (dog < "and" and \n"hello"): print', output: 'if (dog >= "and" or \n!"hello"): print' },
    { input: 'if dog == cat: print', output: 'if dog != cat: print' },
    { input: 'if dog is cat: print', output: 'if dog is not cat: print' },
    { input: 'if dog is cat + 2: print', output: 'if dog is not cat + 2: print' },
    { input: 'if dog is not cat: print', output: 'if dog is cat: print' },
    { input: 'if dog is  not cat: print', output: 'if dog is  cat: print' },
    { input: 'if dog is  cat: print', output: 'if dog is not  cat: print' },
    { input: 'if dog is not cat - 2: print', output: 'if dog is cat - 2: print' },
    { input: 'if dog is not cat -2: print', output: 'if dog is cat -2: print' },
    { input: 'if   dog   is   cat   +   2: print', output: 'if   dog   is not   cat   +   2: print' },
    { input: 'if   dog   is   not   cat  : print', output: 'if   dog   is     cat  : print' },
    { input: 'if dog is cat and cat: print', output: 'if dog is not cat or !cat: print' },
    { input: 'if dog is not cat and cat: print', output: 'if dog is cat or !cat: print' },
    { input: 'if (dog is cat and cat): print', output: 'if (dog is not cat or !cat): print' },
    { input: 'if (dog is not cat and cat): print', output: 'if (dog is cat or !cat): print' },
    { input: 'if ((dog is cat and cat)): print', output: 'if ((dog is not cat or !cat)): print' },
    { input: 'if ((dog is not cat or !cat)): print', output: 'if ((dog is cat and cat)): print' },
    { input: 'if dog in cat: print', output: 'if dog not in cat: print' },
    { input: 'if dog not in cat: print', output: 'if dog in cat: print' },
    { input: 'if (dog in cat): print', output: 'if (dog not in cat): print' },
    { input: 'if (dog in cat)  : print', output: 'if (dog not in cat)  : print' },
    { input: 'if (dog not in cat): print', output: 'if (dog in cat): print' },
    { input: 'if (dog not  in   cat): print', output: 'if (dog  in   cat): print' },
    { input: 'if (dog  in   cat): print', output: 'if (dog  not in   cat): print' },
    { input: 'if (dog not  in   cat)  : print', output: 'if (dog  in   cat)  : print' },
    { input: 'if (dog not   in cat): print', output: 'if (dog   in cat): print' },
    { input: 'if (dog   in cat): print', output: 'if (dog   not in cat): print' },
    { input: 'if (dog   not in cat): print', output: 'if (dog   in cat): print' },
    { input: 'if dog === cat + 2: print', output: 'if dog !== cat + 2: print' },
    { input: 'if dog !== cat + 2: print', output: 'if dog === cat + 2: print' },
    { input: 'if not(dog > cat): print', output: 'if (dog > cat): print' },
    { input: 'if not (dog > cat): print', output: 'if (dog > cat): print' },
    { input: 'if (dog > cat): print', output: 'if (dog <= cat): print' },
    { input: 'if isinstance(dog): print', output: 'if !isinstance(dog): print' },
    { input: 'if isinstance(dog) == 2: print', output: 'if isinstance(dog) != 2: print' },
    { input: 'if (isinstance(dog)): print', output: 'if (!isinstance(dog)): print' },
    { input: 'if True: print', output: 'if False: print' },
    { input: 'if False: print', output: 'if True: print' },
    { input: 'if True + True: print', output: 'if !(True + True): print' },
    { input: 'if True > False: print', output: 'if True <= False: print' },
    { input: 'if True == False: print', output: 'if True != False: print' },
    { input: 'if not(True): print', output: 'if (True): print' },
    { input: 'if (True): print', output: 'if (False): print' },
  ].forEach((testProps) => {
    test(testProps.input, () => {
      const result = Inverter.invert(testProps.input);
      assert.strictEqual(result, testProps.output);
    });
  });
});
