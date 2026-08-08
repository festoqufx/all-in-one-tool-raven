import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Calculate the percentage difference between two numbers.
 * @param previous The previous value.
 * @param newValue The new value.
 * @param soften Whether to soften the error and issue a warning instead.
 * @param decimals The number of decimal places to include in the result (default is 2).
 * @returns The percentage difference between the two numbers, formatted to the specified decimal places.
 * 
 * @example
 * const previousValue = '200';
 * const newValue = 150;
 * const percentageDiff = calculatePercentageDifference(previousValue, newValue);
 * 
 */
export function calculatePercentageDifference(
  previous: string | number,
  newValue: string | number,
  soften: boolean = false,
  decimals: number = 2
): number {
  // Convert string inputs to numbers
  const prevNum = typeof previous === 'string' ? parseFloat(previous) : previous;
  const newNum = typeof newValue === 'string' ? parseFloat(newValue) : newValue;

  if (prevNum <= newNum) {
    if (soften) {
      console.warn("The previous value should be greater than the new value.");
    } else {
      throw new Error("The previous value should be greater than the new value.");
    }
  }

  const difference = prevNum - newNum;
  const percentageDifference = (difference / prevNum) * 100;
  // Format the result to the specified number of decimal places
  return parseFloat(percentageDifference.toFixed(decimals));
}


/**
 * Format the given file size in bytes to a human-readable string with appropriate size units.
 * @param bytes - The file size in bytes.
 * @returns The formatted file size as a string with the appropriate size unit.
 * 
 * @example
 * const fileSize = formatFileSize(1024);
 * console.log(fileSize); // Output: "1 KB"
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};



/**
 * Convert a formatted file size string to bytes.
 * @param formattedSize - The formatted file size string (e.g., "1 KB", "1.5 MB").
 * @returns The file size in bytes as a number.
 * 
 * @example
 * const bytes = convertToBytes("1.5 MB");
 * console.log(bytes); // Output: 1572864
 */
export function convertToBytes(formattedSize: string): number {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const [value, unit] = formattedSize.split(" ");
  const index = sizes.indexOf(unit);

  if (index === -1) {
    throw new Error("Invalid size unit.");
  }

  return parseFloat(value) * Math.pow(1024, index);
};
