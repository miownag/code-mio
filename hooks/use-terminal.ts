"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

export interface OutputLine {
  id: string;
  type: "command" | "output" | "error";
  content: string;
  timestamp: number;
  animate?: boolean;
}

interface TerminalState {
  history: OutputLine[];
  commandHistory: string[];
  commandHistoryIndex: number;
  currentInput: string;
  isExecuting: boolean;
}

const VALID_ROUTES = ["/", "/projects", "/posts", "/photos", "/likes"];
const COMMANDS = ["ls", "cd", "clear", "help"] as const;
const MAX_COMMAND_HISTORY = 50;

export const useTerminal = () => {
  const router = useRouter();
  const [state, setState] = useState<TerminalState>({
    history: [],
    commandHistory: [],
    commandHistoryIndex: -1,
    currentInput: "",
    isExecuting: false,
  });

  const historyIndexRef = useRef(-1);

  // Add output line to history
  const addOutput = useCallback(
    (content: string, type: OutputLine["type"] = "output", animate = false) => {
      const newLine: OutputLine = {
        id: `${Date.now()}-${Math.random()}`,
        type,
        content,
        timestamp: Date.now(),
        animate,
      };
      setState((prev) => ({
        ...prev,
        history: [...prev.history, newLine],
      }));
    },
    [],
  );

  // Execute ls command
  const executeLs = useCallback(() => {
    return {
      output: VALID_ROUTES.join("  "),
      type: "output" as const,
    };
  }, []);

  // Execute cd command
  const executeCd = useCallback(
    (path: string) => {
      const normalizedPath = path.startsWith("/") ? path : `/${path}`;

      if (VALID_ROUTES.includes(normalizedPath)) {
        // Add output before navigation
        addOutput(`Navigating to ${normalizedPath}...`, "output");
        // Navigate after a short delay to show the message
        setTimeout(() => {
          router.push(normalizedPath);
        }, 300);
        return null; // Already added output
      } else {
        return {
          output: `cd: ${path}: No such route`,
          type: "error" as const,
        };
      }
    },
    [router, addOutput],
  );

  // Execute clear command
  const executeClear = useCallback(() => {
    setState((prev) => ({
      ...prev,
      history: [],
      commandHistory: [],
    }));
    historyIndexRef.current = -1;
    return null;
  }, []);

  // Execute help command
  const executeHelp = useCallback(() => {
    return {
      output: [
        "Available commands:",
        `  ls${" ".repeat(22)}- List available routes`,
        `  cd <route>${" ".repeat(6)}- Navigate to route`,
        `  clear${" ".repeat(16)}- Clear terminal`,
        `  help${" ".repeat(18)}- Show this message`,
      ].join("\n"),
      type: "output" as const,
    };
  }, []);

  // Execute command
  const executeCommand = useCallback(
    (command: string) => {
      const trimmedCommand = command.trim();
      if (!trimmedCommand) return;

      // Add command to history
      addOutput(`$ ${trimmedCommand}`, "command");

      // Parse command and arguments
      const parts = trimmedCommand.split(/\s+/);
      const cmd = parts[0].toLowerCase();
      const args = parts.slice(1);

      let result: { output: string; type: "output" | "error" } | null = null;

      // Execute based on command
      switch (cmd) {
        case "ls":
          result = executeLs();
          break;
        case "cd":
          if (args.length === 0) {
            result = { output: "cd: missing operand", type: "error" };
          } else {
            result = executeCd(args[0]);
          }
          break;
        case "clear":
          result = executeClear();
          break;
        case "help":
          result = executeHelp();
          break;
        default:
          result = {
            output: `${cmd}: command not found. Type 'help' for available commands.`,
            type: "error",
          };
      }

      // Add result output if any
      if (result) {
        addOutput(result.output, result.type);
      }

      // Update command history
      setState((prev) => ({
        ...prev,
        commandHistory: [...prev.commandHistory, trimmedCommand].slice(
          -MAX_COMMAND_HISTORY,
        ),
        commandHistoryIndex: -1,
      }));
      historyIndexRef.current = -1;
    },
    [addOutput, executeLs, executeCd, executeClear, executeHelp],
  );

  // Handle input change
  const handleInputChange = useCallback((value: string) => {
    setState((prev) => ({ ...prev, currentInput: value }));
  }, []);

  // Handle command submission
  const handleSubmit = useCallback(() => {
    if (state.isExecuting) return;

    executeCommand(state.currentInput);
    setState((prev) => ({ ...prev, currentInput: "" }));
  }, [state.currentInput, state.isExecuting, executeCommand]);

  // Handle command history navigation
  const handleHistoryNavigation = useCallback(
    (direction: "up" | "down") => {
      if (state.commandHistory.length === 0) return;

      let newIndex = historyIndexRef.current;

      if (direction === "up") {
        newIndex =
          newIndex === -1
            ? state.commandHistory.length - 1
            : Math.max(0, newIndex - 1);
      } else {
        newIndex =
          newIndex === -1
            ? -1
            : Math.min(state.commandHistory.length - 1, newIndex + 1);
      }

      historyIndexRef.current = newIndex;

      setState((prev) => ({
        ...prev,
        currentInput:
          newIndex === -1 ? "" : state.commandHistory[newIndex] || "",
        commandHistoryIndex: newIndex,
      }));
    },
    [state.commandHistory],
  );

  // Handle tab completion
  const handleTabCompletion = useCallback(() => {
    const input = state.currentInput.trim().toLowerCase();
    if (!input) return;

    const parts = input.split(/\s+/);
    const cmd = parts[0];

    // If just typing a command, complete command names
    if (parts.length === 1) {
      const matches = COMMANDS.filter((c) => c.startsWith(cmd));
      if (matches.length === 1) {
        setState((prev) => ({ ...prev, currentInput: matches[0] }));
      } else if (matches.length > 1) {
        // Find longest common prefix
        const commonPrefix = matches.reduce((acc, curr) => {
          let i = 0;
          while (i < acc.length && i < curr.length && acc[i] === curr[i]) {
            i++;
          }
          return acc.substring(0, i) as (typeof COMMANDS)[number];
        });
        setState((prev) => ({ ...prev, currentInput: commonPrefix }));
      }
    }
    // If typing cd with argument, complete route paths
    else if (cmd === "cd" && parts.length === 2) {
      const pathPrefix = parts[1].startsWith("/") ? parts[1] : `/${parts[1]}`;
      const matches = VALID_ROUTES.filter((route) =>
        route.startsWith(pathPrefix),
      );
      if (matches.length === 1) {
        setState((prev) => ({ ...prev, currentInput: `cd ${matches[0]}` }));
      }
    }
  }, [state.currentInput]);

  // Initialize with ls command
  const initializeTerminal = useCallback(
    (command: (typeof COMMANDS)[number] = "help") => {
      executeCommand(command);
    },
    [executeCommand],
  );

  return {
    history: state.history,
    currentInput: state.currentInput,
    isExecuting: state.isExecuting,
    handleInputChange,
    handleSubmit,
    handleHistoryNavigation,
    handleTabCompletion,
    initializeTerminal,
  };
};
