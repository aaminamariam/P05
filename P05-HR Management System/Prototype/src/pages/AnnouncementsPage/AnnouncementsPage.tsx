import axios from "axios";
import React, { useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { Alert, Snackbar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import TouchRipple from "@material-ui/core/ButtonBase/TouchRipple";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";

import AddAnnouncements from "./addAnnouncements";

const columns: GridColDef[] = [
  // { field: "id", headerName: "Employee ID", width: 130 },
  { field: "title", headerName: "Title", width: 250 },
  { field: "postedOn", headerName: "Posted On", width: 200 },
  { field: "postedBy", headerName: "Full Name", width: 130 },
  { field: "department", headerName: "Department", width: 130 },
  { field: "data", headerName: "Announcement", width: 300 },
];

export default function AnnouncementsPage() {
  const [list, setList] = useState<any[]>([]);

  const [SnackbarOpen, setSnackbarOpen] = useState(false);
  const [loader, setloader] = useState(true);
  const [firstRender, setfirstRender] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [
      {
        columnField: "rating",
        operatorValue: ">",
        value: "2.5",
      },
    ],
  });

  const handleGetAnnouncements = async () => {
    let x: any = [];
    try {
      const response = await axios.get(
        "http://localhost:5001/getAnnouncements"
      );

      const li = response.data.Items;
      x = li;
      setList(x);
      console.log("ANNOUNCE ITEMS", li);
      setfirstRender(false);
      setloader(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleGetAnnouncements().then(() => {
      if (firstRender === false && modalOpen === false) {
        setSnackbarOpen(true);
      }
    });
  }, [modalOpen, firstRender]);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      setSnackbarOpen(false);
      return;
    }
    setSnackbarOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  function CustomGridToolbar() {
    return (
      <GridToolbarContainer
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div>
          <GridToolbarColumnsButton style={{ margin: 10 }} />
          <GridToolbarFilterButton style={{ margin: 10 }} className={undefined} slot={undefined} classes={undefined} sx={undefined} tabIndex={undefined} color={undefined} translate={undefined} defaultChecked={undefined} defaultValue={undefined} suppressContentEditableWarning={undefined} suppressHydrationWarning={undefined} accessKey={undefined} contentEditable={undefined} contextMenu={undefined} dir={undefined} draggable={undefined} hidden={undefined} id={undefined} lang={undefined} placeholder={undefined} spellCheck={undefined} radioGroup={undefined} role={undefined} about={undefined} datatype={undefined} inlist={undefined} prefix={undefined} property={undefined} resource={undefined} typeof={undefined} vocab={undefined} autoCapitalize={undefined} autoCorrect={undefined} autoSave={undefined} itemProp={undefined} itemScope={undefined} itemType={undefined} itemID={undefined} itemRef={undefined} results={undefined} security={undefined} unselectable={undefined} inputMode={undefined} is={undefined} aria-activedescendant={undefined} aria-atomic={undefined} aria-autocomplete={undefined} aria-busy={undefined} aria-checked={undefined} aria-colcount={undefined} aria-colindex={undefined} aria-colspan={undefined} aria-controls={undefined} aria-current={undefined} aria-describedby={undefined} aria-details={undefined} aria-disabled={undefined} aria-dropeffect={undefined} aria-errormessage={undefined} aria-expanded={undefined} aria-flowto={undefined} aria-grabbed={undefined} aria-haspopup={undefined} aria-hidden={undefined} aria-invalid={undefined} aria-keyshortcuts={undefined} aria-label={undefined} aria-labelledby={undefined} aria-level={undefined} aria-live={undefined} aria-modal={undefined} aria-multiline={undefined} aria-multiselectable={undefined} aria-orientation={undefined} aria-owns={undefined} aria-placeholder={undefined} aria-posinset={undefined} aria-pressed={undefined} aria-readonly={undefined} aria-relevant={undefined} aria-required={undefined} aria-roledescription={undefined} aria-rowcount={undefined} aria-rowindex={undefined} aria-rowspan={undefined} aria-selected={undefined} aria-setsize={undefined} aria-sort={undefined} aria-valuemax={undefined} aria-valuemin={undefined} aria-valuenow={undefined} aria-valuetext={undefined} dangerouslySetInnerHTML={undefined} onCopy={undefined} onCopyCapture={undefined} onCut={undefined} onCutCapture={undefined} onPaste={undefined} onPasteCapture={undefined} onCompositionEnd={undefined} onCompositionEndCapture={undefined} onCompositionStart={undefined} onCompositionStartCapture={undefined} onCompositionUpdate={undefined} onCompositionUpdateCapture={undefined} onFocus={undefined} onFocusCapture={undefined} onBlur={undefined} onBlurCapture={undefined} onChange={undefined} onChangeCapture={undefined} onBeforeInput={undefined} onBeforeInputCapture={undefined} onInput={undefined} onInputCapture={undefined} onReset={undefined} onResetCapture={undefined} onSubmit={undefined} onSubmitCapture={undefined} onInvalid={undefined} onInvalidCapture={undefined} onLoad={undefined} onLoadCapture={undefined} onError={undefined} onErrorCapture={undefined} onKeyDown={undefined} onKeyDownCapture={undefined} onKeyPress={undefined} onKeyPressCapture={undefined} onKeyUp={undefined} onKeyUpCapture={undefined} onAbort={undefined} onAbortCapture={undefined} onCanPlay={undefined} onCanPlayCapture={undefined} onCanPlayThrough={undefined} onCanPlayThroughCapture={undefined} onDurationChange={undefined} onDurationChangeCapture={undefined} onEmptied={undefined} onEmptiedCapture={undefined} onEncrypted={undefined} onEncryptedCapture={undefined} onEnded={undefined} onEndedCapture={undefined} onLoadedData={undefined} onLoadedDataCapture={undefined} onLoadedMetadata={undefined} onLoadedMetadataCapture={undefined} onLoadStart={undefined} onLoadStartCapture={undefined} onPause={undefined} onPauseCapture={undefined} onPlay={undefined} onPlayCapture={undefined} onPlaying={undefined} onPlayingCapture={undefined} onProgress={undefined} onProgressCapture={undefined} onRateChange={undefined} onRateChangeCapture={undefined} onSeeked={undefined} onSeekedCapture={undefined} onSeeking={undefined} onSeekingCapture={undefined} onStalled={undefined} onStalledCapture={undefined} onSuspend={undefined} onSuspendCapture={undefined} onTimeUpdate={undefined} onTimeUpdateCapture={undefined} onVolumeChange={undefined} onVolumeChangeCapture={undefined} onWaiting={undefined} onWaitingCapture={undefined} onAuxClick={undefined} onAuxClickCapture={undefined} onClick={undefined} onClickCapture={undefined} onContextMenu={undefined} onContextMenuCapture={undefined} onDoubleClick={undefined} onDoubleClickCapture={undefined} onDrag={undefined} onDragCapture={undefined} onDragEnd={undefined} onDragEndCapture={undefined} onDragEnter={undefined} onDragEnterCapture={undefined} onDragExit={undefined} onDragExitCapture={undefined} onDragLeave={undefined} onDragLeaveCapture={undefined} onDragOver={undefined} onDragOverCapture={undefined} onDragStart={undefined} onDragStartCapture={undefined} onDrop={undefined} onDropCapture={undefined} onMouseDown={undefined} onMouseDownCapture={undefined} onMouseEnter={undefined} onMouseLeave={undefined} onMouseMove={undefined} onMouseMoveCapture={undefined} onMouseOut={undefined} onMouseOutCapture={undefined} onMouseOver={undefined} onMouseOverCapture={undefined} onMouseUp={undefined} onMouseUpCapture={undefined} onSelect={undefined} onSelectCapture={undefined} onTouchCancel={undefined} onTouchCancelCapture={undefined} onTouchEnd={undefined} onTouchEndCapture={undefined} onTouchMove={undefined} onTouchMoveCapture={undefined} onTouchStart={undefined} onTouchStartCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerOver={undefined} onPointerOverCapture={undefined} onPointerOut={undefined} onPointerOutCapture={undefined} onGotPointerCapture={undefined} onGotPointerCaptureCapture={undefined} onLostPointerCapture={undefined} onLostPointerCaptureCapture={undefined} onScroll={undefined} onScrollCapture={undefined} onWheel={undefined} onWheelCapture={undefined} onAnimationStart={undefined} onAnimationStartCapture={undefined} onAnimationEnd={undefined} onAnimationEndCapture={undefined} onAnimationIteration={undefined} onAnimationIterationCapture={undefined} onTransitionEnd={undefined} onTransitionEndCapture={undefined} open={undefined} components={undefined} onClose={undefined} TransitionComponent={undefined} TransitionProps={undefined} onOpen={undefined} placement={undefined} arrow={undefined} describeChild={undefined} disableFocusListener={undefined} disableHoverListener={undefined} disableInteractive={undefined} disableTouchListener={undefined} enterDelay={undefined} enterNextDelay={undefined} enterTouchDelay={undefined} followCursor={undefined} leaveDelay={undefined} leaveTouchDelay={undefined} PopperComponent={undefined} PopperProps={undefined} />
          <GridToolbarDensitySelector style={{ margin: 10 }} />
          <GridToolbarExport style={{ margin: 10 }} />
        </div>

        <div>
          <AddAnnouncements setOpen={setModalOpen} open={modalOpen} />
        </div>
      </GridToolbarContainer>
    );
  }

  return (
    <div style={{ height: 400, width: "100%" }}>
      {/* <Button onClick={handleAddAnnouncement}>ADD ANNOUNCEMENT</Button> */}
      <DataGrid
        loading={loader}
        rows={list}
        columns={columns}
        autoHeight
        rowsPerPageOptions={[10]}
        components={{
          LoadingOverlay: LinearProgress,
          Toolbar: CustomGridToolbar,
        }}
        // checkboxSelection
        filterModel={filterModel}
        onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
      />
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={SnackbarOpen}
        autoHideDuration={4000}
        onClose={handleClose}
        message="Note archived"
        action={action}
      >
        <Alert onClose={handleClose} severity="success">
          New Announcement added!!
        </Alert>
      </Snackbar>
    </div>
  );
}
