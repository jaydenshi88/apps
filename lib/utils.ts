import { customAlphabet } from "nanoid";
import { ToolDefinition } from '@/lib/tool-definition';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  eq,
  like,
  not,
  notLike,
  type Column,
  type ColumnBaseConfig,
  type ColumnDataType,
} from "drizzle-orm";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789");

export const timestamps: { createdAt: true; updatedAt: true } = {
  createdAt: true,
  updatedAt: true,
};

export function filterColumn({
  column,
  value,
}: {
  column: Column<ColumnBaseConfig<ColumnDataType, string>, object, object>;
  value: string;
}) {
  const [filterValue, filterVariety] = value?.split(".") ?? [];

  switch (filterVariety) {
    case "contains":
      return like(column, `%${filterValue}%`);
    case "does not contain":
      return notLike(column, `%${filterValue}%`);
    case "is":
      return eq(column, filterValue);
    case "is not":
      return not(eq(column, filterValue));
    default:
      return like(column, `%${filterValue}%`);
  }
}

/**
 * Converts a page and rowsPerPage into an offset and limit for use in SQL
 * @param page - The current page
 * @param rowsPerPage - The number of rows per page
 * @returns - An object with offset and limit properties
 * @example
 * const { offset, limit } = paginationConverter({ page: 1, rowsPerPage: 10 });
 */
export function paginationConverter({
  page,
  rowsPerPage,
}: {
  page: number;
  rowsPerPage: number;
}) {
  return {
    offset: page == 1 ? 0 : page * rowsPerPage,
    limit: rowsPerPage,
  };
}
import { OpenAIStream } from 'ai';
import type OpenAI from 'openai';
import zodToJsonSchema from 'zod-to-json-schema';

const consumeStream = async (stream: ReadableStream) => {
  const reader = stream.getReader();
  while (true) {
    const { done } = await reader.read();
    if (done) break;
  }
};

export function runOpenAICompletion<
  T extends Omit<
    Parameters<typeof OpenAI.prototype.chat.completions.create>[0],
    'functions'
  > & {
    functions: ToolDefinition<any, any>[];
  },
>(openai: OpenAI, params: T) {
  let text = '';
  let hasFunction = false;

  type FunctionNames = T['functions'] extends Array<any>
    ? T['functions'][number]['name']
    : never;

  let onTextContent: (text: string, isFinal: boolean) => void = () => { };

  let onFunctionCall: Record<string, (args: Record<string, any>) => void> = {};

  const { functions, ...rest } = params;

  (async () => {
    consumeStream(
      OpenAIStream(
        (await openai.chat.completions.create({
          ...rest,
          stream: true,
          functions: functions.map(fn => ({
            name: fn.name,
            description: fn.description,
            parameters: zodToJsonSchema(fn.parameters) as Record<
              string,
              unknown
            >,
          })),
        })) as any,
        {
          async experimental_onFunctionCall(functionCallPayload) {
            hasFunction = true;
            onFunctionCall[
              functionCallPayload.name as keyof typeof onFunctionCall
            ]?.(functionCallPayload.arguments as Record<string, any>);
          },
          onToken(token) {
            text += token;
            if (text.startsWith('{')) return;
            onTextContent(text, false);
          },
          onFinal() {
            if (hasFunction) return;
            onTextContent(text, true);
          },
        },
      ),
    );
  })();

  return {
    onTextContent: (
      callback: (text: string, isFinal: boolean) => void | Promise<void>,
    ) => {
      onTextContent = callback;
    },
    onFunctionCall: (
      name: FunctionNames,
      callback: (args: any) => void | Promise<void>,
    ) => {
      onFunctionCall[name] = callback;
    },
  };
}


export const formatNumber = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);

export const runAsyncFnWithoutBlocking = (
  fn: (...args: any) => Promise<any>,
) => {
  fn();
};

export const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

// Fake data
export function getStockPrice(name: string) {
  let total = 0;
  for (let i = 0; i < name.length; i++) {
    total = (total + name.charCodeAt(i) * 9999121) % 9999;
  }
  return total / 100;
}
