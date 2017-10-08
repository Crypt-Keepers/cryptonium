export default function changePanelSelection(selection) {
  return {
    type: 'CHANGE_PANEL_SELECTION',
    payload: { selection },
  };
}
