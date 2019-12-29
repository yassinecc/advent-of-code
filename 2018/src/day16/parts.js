const { filter, map, isEqual, intersection, difference, flatten } = require('lodash');
const opcodes = require('./opcodes');
const { findRegex } = require('../../utils/common');

parseLines = input => {
  const samples = [];
  let index = 0;
  while (input[index] && input[index].includes('Before')) {
    samples.push(input.slice(index, index + 3));
    index += 4;
  }
  return { samples };
};

const parseTestProgram = input => {
  const testStartIndex = input.findIndex(
      (element, index) => element && element.match(/^[0-9]/g) && input[index + 1].match(/^[0-9]/g)
  );
  return input.slice(testStartIndex);
};

const parseRegisters = registerLine => {
  const registersData = findRegex(registerLine, /\[(.*?)\]/g);
  return registersData.split(',').map(Number);
};

const parseInstruction = instructionLine => {
  const instructionParts = instructionLine.split(' ').map(Number);
  return {
    opId: instructionParts[0],
    inA: instructionParts[1],
    inB: instructionParts[2],
    regC: instructionParts[3]
  };
};

const getMatchingOperations = sample => {
  const [beforeLine, instructionLine, afterLine] = sample;
  const registers = parseRegisters(beforeLine);
  const instruction = parseInstruction(instructionLine);
  const expectedRegisters = parseRegisters(afterLine);
  const possibleOperations = map(opcodes, opcode =>
    isEqual(
        expectedRegisters,
        opcode(registers, instruction.inA, instruction.inB, instruction.regC)
    )
      ? opcode.name
      : false
  ).filter(Boolean);
  return { id: instruction.opId, operations: possibleOperations };
};

const executeInstruction = (registers, instructionLine, registersMap) => {
  const instruction = parseInstruction(instructionLine);
  const opCode = registersMap[instruction.opId];
  return opcodes[opCode](registers, instruction.inA, instruction.inB, instruction.regC);
};

const isUndetermined = registersMap =>
  registersMap.filter(register => register.length > 1).length > 0;

const knownOpcodes = registersMap =>
  flatten(registersMap.filter(register => register.length === 1));

const getOpcodes = input => {
  let registersMap = Array(16);
  const { samples } = parseLines(input);
  samples.forEach(sample => {
    const { id, operations } = getMatchingOperations(sample);
    if (registersMap[id]) {
      registersMap[id] = intersection(registersMap[id], operations);
    } else registersMap[id] = operations;
  });
  while (isUndetermined(registersMap)) {
    registersMap = registersMap.map(register =>
      register.length === 1 ? register : difference(register, knownOpcodes(registersMap))
    );
  }
  return flatten(registersMap);
};

const part1 = input => {
  const { samples } = parseLines(input);
  const allSamples = samples.map(getMatchingOperations);
  return filter(allSamples, sample => sample.operations.length >= 3).length;
};
const part2 = input => {
  const registersMap = getOpcodes(input);
  let registers = Array(4).fill(0);
  const testProgram = parseTestProgram(input);
  testProgram.forEach(instructionLine => {
    registers = executeInstruction(registers, instructionLine, registersMap);
  });
  return registers[0];
};
module.exports = { parseRegisters, parseInstruction, getMatchingOperations, part1, part2 };
