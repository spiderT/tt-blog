// 命名建议：xxxBuilder
class PeopleConfigBuilder {
  name = "";
  age = 0;
  des = "";
  async buildName() {
    // this.name = await get("someUrl");
    this.name = '张哲瀚';
  }
  async buildAge() {
    // this.age = await get("someUrl?name=" + this.name);
    this.age = 30;
  }
  async buildDes(description) {
    // this.des = handleDes(description);
    this.des = '大帅哥';
  }
}

class People {
  name = "";
  age = 0;
  des = "";
  constructor(peopleConfig) {
    this.name = peopleConfig.name;
    this.age = peopleConfig.age;
    this.des = peopleConfig.des;
  }
}

async function peopleFactory() {
  const builder = new PeopleConfigBuilder();
  builder.buildName();
  builder.buildAge();
  builder.buildDes();
  return new People(builder);
}

const people = peopleFactory();

console.log('people', people)
