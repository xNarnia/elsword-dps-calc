var DPSOutput = "#dpsOutput";
            var DPSInput = "#dpsInput";
            var HourInput = "#hours";
            var MinuteInput = "#minutes";
            var SecondInput = "#seconds";
            var CalculateButton = "#calculate";
            var AllTimeInputs = ".timeInput";

            function LimitInputs(){
                LimitHours();
                LimitMinutes();
                LimitSeconds();
            }

            function LimitHours(target) {
                if(target == null) {
                    target = HourInput;
                }

                ProcessInputRange(target, 0, 23);
            }

            function LimitMinutes(target) {
                if(target == null) {
                    target = MinuteInput;
                }

                ProcessInputRange(target, 0, 59);
            }

            function LimitSeconds(target){
                if(target == null) {
                    target = SecondInput;
                }

                ProcessInputRange(target, 0, 59);
            }

            function ProcessInputRange(inputTarget, start, end) {
                var val = inputTarget.value;
                if(val == null){
                    val = $(inputTarget).val();
                }

                if(val < start) {
                    $(inputTarget).val(start);
                }
                else if (val > end) {
                    $(inputTarget).val(end);
                }
            }

            function CalculateDPS(){
                var dps = parseInt($(DPSInput).val().replace(/,/g, ""));
                var hours = parseInt($(HourInput).val());
                var minutes = parseInt($(MinuteInput).val());
                var seconds = parseInt($(SecondInput).val());

                var dpsPerMinute = dps / ((hours * 60) + minutes + (seconds / 60));
                if(!isNaN(dpsPerMinute)){
                    $(DPSOutput).html(numberWithCommas(Math.round(dpsPerMinute)) + "<br />damage per minute");
                }
                else {
                    $(DPSOutput).html("<br />Invalid Input");
                }
            }
            
            function numberWithCommas(x) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }

            function PadInputWithZeros(target) {
            }

            $(document).ready(function() {
                $(AllTimeInputs).val("00");

                /* Tab handling - Allows a user to tab from one input to the next */
                $(DPSInput).on('keydown', function(e) {
                    var keyCode = e.keyCode || e.which;

                    if (keyCode == 9) {
                        e.preventDefault();
                        $(HourInput).focus();
                    }
                });
                $(HourInput).on('keydown', function(e) {
                    var keyCode = e.keyCode || e.which;

                    if (keyCode == 9) {
                        e.preventDefault();
                        $(MinuteInput).focus();
                    }
                });
                $(MinuteInput).on('keydown', function(e) {
                    var keyCode = e.keyCode || e.which;

                    if (keyCode == 9) {
                        e.preventDefault();
                        $(SecondInput).focus();
                    }
                });
                $(SecondInput).on('keydown', function(e) {
                    var keyCode = e.keyCode || e.which;

                    if (keyCode == 9) {
                        e.preventDefault();
                        $(CalculateButton).focus();
                    }
                });

                /* Time Inputs - Range limiting */
                $(HourInput).on("input", function() {
                    LimitHours(this);
                });
                $(MinuteInput).on("input", function() {
                    LimitMinutes(this);
                });
                $(SecondInput).on("input", function() {
                    LimitSeconds(this);
                });
                $(AllTimeInputs).focus(function () {
                    this.value = "";
                });
                $(AllTimeInputs).focusout(function () {
                    LimitInputs();
                    if (this.value < 10 && this.value >= 0) {
                        this.value = String(this.value).padStart(2, '0');
                    }
                });

                /* Arrow Buttons */
                $(".arrow.up").click(function () {
                    var target = $("#" + $(this).attr("for"));
                    var val = target.val();

                    val++;
                    target.val(val);
                    LimitInputs();

                    if (val < 10 && val >= 0) {
                        target.val(String(val).padStart(2, '0'));
                    }
                });
                
                $(".arrow.down").click(function () {
                    var target = $("#" + $(this).attr("for"));
                    var val = target.val();

                    val--;
                    target.val(val);
                    LimitInputs();

                    if (val < 10 && val >= 0) {
                        target.val(String(val).padStart(2, '0'));
                    }
                    if (val == -1) { // Lazy way to fix the issue
                        target.val(String(0).padStart(2, '0'));
                    }
                });

                /* DPS Input */
                $(DPSInput).on("input", function() {
                    var val = $(DPSInput).val();
                    if(val != ""){
                        val = parseInt(val.replace(/,/g, ""));
                        $(DPSInput).val(numberWithCommas(val));
                    }
                });
                $(DPSInput).focusout(function () {
                    var val = $(DPSInput).val();
                    if(val != ""){
                        val = parseInt(val.replace(/,/g, ""));
                        $(DPSInput).val(numberWithCommas(val));
                    }
                });
                $(DPSInput).focus(function () {
                    this.value = "";
                });

                $(CalculateButton).click(function () {
                    CalculateDPS();
                });
            });