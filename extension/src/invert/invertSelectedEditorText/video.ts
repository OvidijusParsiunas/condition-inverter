export class Animal {
  private static readonly fish = 20;
  private static readonly cat = true;
  private static readonly dog = true;

  public static print(): void {
    if (Animal.cat && Animal.dog) {
      if (Animal.fish < 52) {
        console.log('fish');
      } else if (Animal.fish > 30) {
        console.log('cat');
      } else {
        console.log('dog');
      }
    }
  }

  public static print2(): void {
    if (true && 1) {
      console.log('dog');
    }
  }
}
