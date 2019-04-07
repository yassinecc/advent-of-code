// addr (add register) stores into register C the result of adding register A and register B.
// addi (add immediate) stores into register C the result of adding register A and value B.
const addr = (registers, regA, regB, regC) => {
  const newRegisters = [...registers];
  newRegisters[regC] = registers[regA] + registers[regB];
  return newRegisters;
};
const addi = (registers, regA, valB, regC) => {
  const newRegisters = [...registers];
  newRegisters[regC] = registers[regA] + valB;
  return newRegisters;
};

// mulr (multiply register) stores into register C the result of multiplying register A and register B.
// muli (multiply immediate) stores into register C the result of multiplying register A and value B.
const mulr = (registers, regA, regB, regC) => {
  const newRegisters = [...registers];
  newRegisters[regC] = registers[regA] * registers[regB];
  return newRegisters;
};
const muli = (registers, regA, valB, regC) => {
  const newRegisters = [...registers];
  newRegisters[regC] = registers[regA] * valB;
  return newRegisters;
};

// banr (bitwise AND register) stores into register C the result of the bitwise AND of register A and register B.
// bani (bitwise AND immediate) stores into register C the result of the bitwise AND of register A and value B.
const banr = (registers, regA, regB, regC) => {
  const newRegisters = [...registers];
  newRegisters[regC] = registers[regA] & registers[regB];
  return newRegisters;
};
const bani = (registers, regA, valB, regC) => {
  const newRegisters = [...registers];
  newRegisters[regC] = registers[regA] & valB;
  return newRegisters;
};

// borr (bitwise OR register) stores into register C the result of the bitwise OR of register A and register B.
// bori (bitwise OR immediate) stores into register C the result of the bitwise OR of register A and value B.
const borr = (registers, regA, regB, regC) => {
  const newRegisters = [...registers];
  newRegisters[regC] = registers[regA] | registers[regB];
  return newRegisters;
};
const bori = (registers, regA, valB, regC) => {
  const newRegisters = [...registers];
  newRegisters[regC] = registers[regA] | valB;
  return newRegisters;
};

// setr (set register) copies the contents of register A into register C. (Input B is ignored.)
// seti (set immediate) stores value A into register C. (Input B is ignored.)
const setr = (registers, regA, inB, regC) => {
  const newRegisters = [...registers];
  newRegisters[regC] = registers[regA];
  return newRegisters;
};
const seti = (registers, valA, inB, regC) => {
  const newRegisters = [...registers];
  newRegisters[regC] = valA;
  return newRegisters;
};

// gtir (greater-than immediate/register) sets register C to 1 if value A is greater than register B. Otherwise, register C is set to 0.
// gtri (greater-than register/immediate) sets register C to 1 if register A is greater than value B. Otherwise, register C is set to 0.
// gtrr (greater-than register/register) sets register C to 1 if register A is greater than register B. Otherwise, register C is set to 0.
const gtir = (registers, valA, regB, regC) => {
  const newRegisters = [...registers];
  newRegisters[regC] = Number(valA > registers[regB]);
  return newRegisters;
};
const gtri = (registers, regA, valB, regC) => {
  const newRegisters = [...registers];
  newRegisters[regC] = Number(registers[regA] > valB);
  return newRegisters;
};
const gtrr = (registers, regA, regB, regC) => {
  const newRegisters = [...registers];
  newRegisters[regC] = Number(registers[regA] > registers[regB]);
  return newRegisters;
};

// eqir (equal immediate/register) sets register C to 1 if value A is equal to register B. Otherwise, register C is set to 0.
// eqri (equal register/immediate) sets register C to 1 if register A is equal to value B. Otherwise, register C is set to 0.
// eqrr (equal register/register) sets register C to 1 if register A is equal to register B. Otherwise, register C is set to 0.
const eqir = (registers, valA, regB, regC) => {
  const newRegisters = [...registers];
  newRegisters[regC] = Number(valA === registers[regB]);
  return newRegisters;
};
const eqri = (registers, regA, valB, regC) => {
  const newRegisters = [...registers];
  newRegisters[regC] = Number(registers[regA] === valB);
  return newRegisters;
};
const eqrr = (registers, regA, regB, regC) => {
  const newRegisters = [...registers];
  newRegisters[regC] = Number(registers[regA] === registers[regB]);
  return newRegisters;
};

module.exports = {
  addr,
  addi,
  mulr,
  muli,
  banr,
  bani,
  borr,
  bori,
  setr,
  seti,
  gtir,
  gtri,
  gtrr,
  eqir,
  eqri,
  eqrr,
};
