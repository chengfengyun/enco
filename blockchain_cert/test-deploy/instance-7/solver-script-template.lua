--[[
*********************************************************************
*                        script for solver                          *
*-------------------------------------------------------------------*
*                                                                   *
*  What you have to do:                                             *
*    1) tell the host routine the dimension of this script by defi- *
*  ning the global variable "GLOBAL_SOLVER_DIMENSION".              *
*    2) program the callback function "SOLVE_THE_PAIR".             *
*    3) in addition, you can program this entire script as freely   *
*  as you want but make sure that this script follows the grammar   *
*  of language LUA.                                                 *
*                                                                   *
*********************************************************************
--]]

-- for example, this script is prepared for 2-D solver
GLOBAL_SOLVER_DIMENSION = 2
--[[   if you want to prepare for higher dimension solver, you can
      use one line of the following annotation as the script.  ]]
-- GLOBAL_SOLVER_DIMENSION = 3
-- GLOBAL_SOLVER_DIMENSION = 4
-- GLOBAL_SOLVER_DIMENSION = 5

-- default threshold of judging is 0.5, but you can redefine it.
GLOBAL_THRESHOLD = 0.5

GLOBAL_IDCTDESC = {}	-- fixed external table, wrote by host
GLOBAL_SELF = {}		-- fixed external table, wrote by host

--[[
@description:
  This is a CALL-BACK function that will be called by host program.
@param:
   1) [in] self: represents the self indicator meta.
   2) [in] opposite: represents the other indicator meta.
@return:
   1) number: tell host routine about matching degree of the pair.
      value range is [0.0 ~ 1.0]
	  
@remarks:
   1) both two parameters are tables. the key of table refers to the
    segment of indicator's description.
   2) we recommands that solving algorithm should be designed follow-
    ing the principle of matching, which is described in documents.
--]]
function SOLVE_THE_PAIR(self, opposite)
	return 0.0
end