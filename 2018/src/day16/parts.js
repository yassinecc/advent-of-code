const { map, isEqual } = require('lodash');
const opcodes = require('./opcodes');
const { findRegex } = require('../../utils/common');

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
    regC: instructionParts[3],
  };
};

const executeSample = (beforeLine, instructionLine, afterLine) => {
  const registers = parseRegisters(beforeLine);
  const instruction = parseInstruction(instructionLine);
  const expectedRegisters = parseRegisters(afterLine);
  return map(opcodes, opcode =>
    isEqual(
        expectedRegisters,
        opcode(registers, instruction.inA, instruction.inB, instruction.regC)
    )
      ? opcode.name
      : false
  ).filter(Boolean);
};

const part1 = () => 0;
const part2 = () => 0;
module.exports = { parseRegisters, parseInstruction, executeSample, part1, part2 };
