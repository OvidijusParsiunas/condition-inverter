import { ExpandSelectionStartToIndicator } from './analysis/expandSelection/expandSelectionStartToIndicator';
import { ExpandSelectionEndToIndicator } from './analysis/expandSelection/expandSelectionEndToIndicator';
import { InversionRangeDetails } from '../../../../../shared/types/inversionRangeDetails';
import { FullWordRange } from './analysis/fullWordRange/fullWordRange';
import { RangeCreator } from '../../../../shared/rangeCreator';
import { TextEditor } from 'vscode';

export class InversionRangeDetailsFactory {
  // WORK - _ that is next to the string should be regarded as part of it
  public static create(editor: TextEditor): InversionRangeDetails {
    const fullWordRange = FullWordRange.extract(editor);
    const startPositionDetails = ExpandSelectionStartToIndicator.getNewPositionDetails(editor, fullWordRange);
    const endPositionDetails = ExpandSelectionEndToIndicator.getNewPositionDetails(editor, fullWordRange);
    return {
      range: RangeCreator.create(startPositionDetails.position, endPositionDetails.position),
      startOperatorPadding: startPositionDetails.startOperatorPadding || '',
      endOperatorPadding: endPositionDetails.endOperatorPadding || '',
    };
  }
}
